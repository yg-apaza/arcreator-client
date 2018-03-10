import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Markers } from './markers';
import { ReadResponse } from '../../../interfaces/responses/readresponse';
import { PolyService } from '../../../services/poly.service';
import { AppSettings } from '../../../appSettings';

declare var Blockly: any;

@Component({
    selector: 'app-artoolkit-editor',
    templateUrl: './artoolkit-editor.component.html',
    styleUrls: ['./artoolkit-editor.component.css'],
    providers: [PolyService]
})

export class ArtoolkitEditorComponent implements OnInit {

    @Input() arApp: ReadResponse;

    addMarkerModalReference: NgbModalRef;
    addResourceModalReference: NgbModalRef;

    // Add new marker
    availableMarkers: Array<any>;
    selectedMarkerName: string;

    markerImageList: Array<string>;

    // Add new resource
    showPlaceholderEmptySearch: boolean;
    keywords: string;
    resultResources: Array<any>;
    selectedResourceUrl: string;

    resourceImageList: Array<string>;


    // Blockly
    public toolbox: string =
        `<xml id="toolbox" style="display: none">
            <category name="Events">
                <block type="marker_is_detected"></block>
            </category>
            <category name="Actions">
                <block type="augment_resource"></block>
            </category>
        </xml>`;

    workspacePlayground: any;

    constructor(
        private modalService: NgbModal,
        private polyService: PolyService
    ) { }

    ngOnInit() {
        this.showPlaceholderEmptySearch = true;
        this.availableMarkers = Markers.availableMarkers;
        this.markerImageList = [];
        this.resourceImageList = [];

        for (let markerName of this.arApp.markers) {
            this.markerImageList.push(this.getMarkerPath(markerName));
        }

        let promises = [];

        for (let resourceUrl of this.arApp.resources) {
            promises.push(new Promise((resolve, reject) => {
                this.getResourceThumbnail(resourceUrl.url, (url) => {
                    resolve(url);
                });
            }));
        }

        Promise.all(promises)
            .then((results) => {
                this.resourceImageList = results;
            });

        this.createBlocks();
        this.addCustomBlocks();
    }

    createBlocks() {
        var blocklyArea: HTMLElement = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        this.workspacePlayground = Blockly.inject(blocklyDiv,
            { toolbox: this.toolbox });
        var onresize = function (e) {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element: HTMLElement = blocklyArea;
            var x = 0;
            var y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent as HTMLElement;
            } while (element);
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
            blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        };
        window.addEventListener('resize', onresize, false);
        onresize(1);
        Blockly.svgResize(this.workspacePlayground);
    }

    addCustomBlocks() {

        // Block definitions

        Blockly.Blocks['marker_is_detected'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("When marker")
                    .appendField(new Blockly.FieldTextInput("MARKER NAME"), "MARKER_NAME")
                    .appendField("is detected");
                this.appendValueInput("EVENT")
                    .setCheck("Action");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(285);
                this.setTooltip("Event when a marker is detected");
                this.setHelpUrl("");
            }
        };

        Blockly.Blocks['augment_resource'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("augment")
                    .appendField(new Blockly.FieldTextInput("RESOURCE NAME"), "RESOURCE_NAME");
                this.setInputsInline(true);
                this.setOutput(true, "Action");
                this.setColour(240);
                this.setTooltip("Augment a resource");
                this.setHelpUrl("");
            }
        };

        // Custom JSON generator code

        let eventJSONTemplate: string = '{ "interfaceEvent": $ , "markerName": "$" , $ }';

        Blockly.JSON['marker_is_detected'] = function (block) {
            var text_marker_name = block.getFieldValue('MARKER_NAME');
            var value_action = Blockly.JSON.valueToCode(block, 'EVENT', Blockly.JSON.ORDER_ATOMIC);
            var code =
                eventJSONTemplate
                    .replace('$', '1')
                    .replace('$', text_marker_name)
                    .replace('$', value_action);

            return code;
        };

        let actionJSONTemplate: string = '"interfaceAction": $ , "resourceName": "$"';

        Blockly.JSON['augment_resource'] = function (block) {
            var text_resource_name = block.getFieldValue('RESOURCE_NAME');
            var code =
                actionJSONTemplate
                    .replace('$', '1')
                    .replace('$', text_resource_name);

            return [code, Blockly.JSON.ORDER_ATOMIC];
        };
    }

    openAddMarkerModal(content) {
        this.addMarkerModalReference = this.modalService.open(content);
        var code = Blockly.JSON.workspaceToCode(this.workspacePlayground);
        console.log(JSON.parse(code));
    }

    openAddResourceModal(content) {
        this.addResourceModalReference = this.modalService.open(content);
    }

    addMarker() {
        if (this.selectedMarkerName && this.selectedMarkerName !== "") {
            this.arApp.markers.push(this.selectedMarkerName);
            this.markerImageList.push(this.getMarkerPath(this.selectedMarkerName));
        }

        this.addMarkerModalReference.close();
    }

    private getMarkerPath(name: string): string {
        return this.availableMarkers.find(m => m.name == name).path;
    }

    searchKeywords() {
        this.polyService.listAssets({ keywords: this.keywords, format: 'OBJ', pageSize: '12', key: AppSettings.POLY_API_KEY })
            .subscribe(
                res => {
                    this.resultResources = res.body.assets;
                    if (this.resultResources && this.resultResources.length != 0)
                        this.showPlaceholderEmptySearch = false;
                    else
                        this.showPlaceholderEmptySearch = true;
                    this.selectedResourceUrl = "";
                },
                err => {
                    console.log("Error occurred");
                }
            )
    }

    addResource() {
        if (this.selectedResourceUrl && this.selectedResourceUrl !== "") {
            this.arApp.resources.push({ name: this.selectedResourceUrl, type: 'poly', url: this.selectedResourceUrl });
            this.getResourceThumbnail(this.selectedResourceUrl, (url) => {
                this.resourceImageList.push(url);
            });
        }

        this.addResourceModalReference.close();
    }

    private getResourceThumbnail(url: string, callback: (url: string) => any) {

        this.polyService.getAsset(url, { key: AppSettings.POLY_API_KEY })
            .subscribe(
                res => {
                    callback(res.body.thumbnail.url);
                },
                err => {
                    console.log("Error occurred");
                }
            )
    }
}
