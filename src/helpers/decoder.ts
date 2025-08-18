/* eslint-disable fp/no-mutation */
import { defaultDecoder } from 'src/decoders/default';
import { SeapHOxV2Decoder } from 'src/decoders/SeapHOxV2';
import { Decoder, DecoderConfig, DecoderOutput, SensorStruct } from './types';
import { Buffer } from 'buffer';

interface HexToStructProps {
  byteData: Buffer;
  structDescription: SensorStruct;
  offset: number;
}

/**
 * This function converts hexadecimal data to a structured format.
 * It takes a buffer of byte data, a description of the sensor structure, and an offset as input.
 * The function iterates over the byte data according to the sensor structure and converts the data to a structured format.
 * The offset is used to keep track of the position in the byte data.
 */
function hexToStruct({
  byteData,
  structDescription,
  offset: initialOffset,
}: HexToStructProps): {
  offset: number;
  decoded: {
    [key: string]: number;
  };
} {
  const decoded: { [key: string]: number } = {};
  let offset = initialOffset;
  offset = 68;
  console.log(byteData);
  for (const { key, dataType } of structDescription) {
    if (dataType === 'uint16_t') {
      decoded[key] = byteData.readUInt16LE(offset);
      offset += 2;
    } else if (dataType === 'double') {
      decoded[key] = byteData.readDoubleLE(offset);
      offset += 8;
    } else if (dataType === 'float') {
      decoded[key] = byteData.readFloatLE(offset);
      offset += 4;
    } else {
      throw new Error(`Unsupported data type: ${dataType}`);
    }
  }

  return { decoded, offset };
}

interface DecodeProps {
  decoderConfig: DecoderConfig;
  hexData: string;
}

// new function
// this is my approach to making this guy work.
function stringToStruct(hexString: string, structDescription: SensorStruct, splitChar: string) {
  console.log("stringToStruct", hexString, structDescription, splitChar);
  // splitting the string into a list based on splitChar
  const hexValues = hexString.split(splitChar);
  let result: { [key: string]: string } = {};
  for (const [index, { key }] of structDescription.entries()) {
    result[key] = hexValues[index] || '';
  }
  return result;
}

function removePadding(hexString: string): string {
  while(hexString.endsWith('00')){
    hexString = hexString.slice(0, -2);
  }
  return hexString;
}


/**
 * This function decodes the hex data using the provided decoder configuration.
 * It iterates over each struct in the decoder configuration, and for each struct, it decodes the corresponding part of the hex data.
 * The decoded data is then stored in the result object, with the struct name as the key.
 */
export function decode({ decoderConfig, hexData }: DecodeProps): DecoderOutput {
  console.log("woo", hexData);
  hexData = removePadding(hexData)
  // going to decode into a string because I'm a lil more comfortable with string manip than what is already here 
  // and this hex to struct method is not going to work for our use case as is, too much messy data
  const byteData = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');
  console.log("byteData", byteData.toString());
  const result: DecoderOutput = {};
    // If the splitChar is empty, we use the default decoding method
  if(decoderConfig[0].splitChar === "") { // TODO: make this a lil more sane, should do a better check than this
    let offset = 0;

    for (const { name, struct, splitChar } of decoderConfig) {
      if(splitChar !== decoderConfig[0].splitChar) {
        // If the splitChar is different, we cannot switch methods without putting the offset out of sync I'm pretty sure
        throw new Error(`Inconsistent splitChar detected in decoder config ${name}: ${splitChar}`);
      }
      const { decoded, offset: newOffset } = hexToStruct({
        byteData,
        structDescription: struct,
        offset,
      });
      result[name] = decoded;
      offset = newOffset;
    }
  }else{
    for(const {name, struct, splitChar } of decoderConfig) {
      if(splitChar !== decoderConfig[0].splitChar) {
        throw new Error(`Inconsistent splitChar detected in decoder config ${name}: ${splitChar}`);
      }
      result[name] = stringToStruct(byteData.toString(), struct, splitChar,);

    }
  }

  return result;
}

export const decoders: Decoder[] = [defaultDecoder, SeapHOxV2Decoder];
