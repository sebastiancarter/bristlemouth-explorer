/**
 * This is a sample decoder configuration, as per the example provided here:
 * https://bristlemouth.notion.site/Bristlemouth-Dev-Kit-Guide-5-Developing-a-Simple-Application-a69c351dadba4772926ada25a08a43fc
 * A decoder comprises a list of sensors. Each sensor is described by a struct,
 * which contains information about the datatype and the name of the encoded values.
 * The "display" attribute is used to select the values that will be displayed on the table in this application.
 */

import { Decoder, SensorStruct } from 'src/helpers/types';
// 14 keys
const SeapHOxV2Struct: SensorStruct = [
  { key: 'name', dataType: 'uint16_t', display: true },
  { key: 'date', dataType: 'uint16_t', display: true },
  { key: 'pos1', dataType: 'uint16_t', display: true },
  { key: 'pos2', dataType: 'uint16_t', display: true },
  { key: 'pos3', dataType: 'uint16_t', display: true },
  { key: 'pos4', dataType: 'uint16_t', display: true },
  { key: 'pos5', dataType: 'uint16_t', display: true },
  { key: 'poa6', dataType: 'uint16_t', display: true },
  { key: 'poa7', dataType: 'uint16_t', display: true },
  { key: 'poa8', dataType: 'uint16_t', display: true },
  { key: 'pos9', dataType: 'uint16_t', display: true },
  { key: 'poa10', dataType: 'uint16_t', display: true },
  { key: 'poa11', dataType: 'uint16_t', display: true },
  { key: 'poa12', dataType: 'uint16_t', display: true },
  { key: 'poa13', dataType: 'uint16_t', display: true },
  { key: 'poa14', dataType: 'uint16_t', display: true },
];

export const SeapHOxV2Decoder: Decoder = {
  name: 'SeapHOx V2 Decoder',
  config: [
    { name: 'data', struct: SeapHOxV2Struct, splitChar: "," },
  ],
};
