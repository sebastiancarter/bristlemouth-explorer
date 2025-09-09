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
  { key: 'dateTime', dataType: 'uint16_t', display: true },
  { key: 'Sample Number', dataType: 'uint16_t', display: true },
  { key: 'Error Flags', dataType: 'uint16_t', display: true },
  { key: 'Temperature (celsius)', dataType: 'uint16_t', display: true },
  { key: 'External pH (pH)', dataType: 'uint16_t', display: true },
  { key: 'Internal pH (pH)', dataType: 'uint16_t', display: true },
  { key: 'External pH (Volt)', dataType: 'uint16_t', display: true },
  { key: 'Internal pH (Volt)', dataType: 'uint16_t', display: true },
  { key: 'pH Temperature (celsius)', dataType: 'uint16_t', display: true },
  { key: 'Pressure (Decibar)', dataType: 'uint16_t', display: true },
  { key: 'Salinity (psu)', dataType: 'uint16_t', display: true },
  { key: 'Conductivity (S/m)', dataType: 'uint16_t', display: true },
  { key: 'Oxygen (ml/L)', dataType: 'uint16_t', display: true },
  { key: 'Relative Humidity (%)', dataType: 'uint16_t', display: true },
  { key: 'Int Temperature (celsius)', dataType: 'uint16_t', display: true },
];

export const SeapHOxV2Decoder: Decoder = {
  name: 'SeapHOx V2 Decoder',
  config: [
    { name: 'data', struct: SeapHOxV2Struct, splitChar: "," },
  ],
};
