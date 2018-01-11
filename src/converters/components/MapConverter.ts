import {Converter} from "../decorators/converter";
import {IConverter} from "../interfaces/index";
import {ConverterService} from "../services/ConverterService";

/**
 * Converter component for the `Map` Type.
 * @private
 * @converters
 * @component
 */
@Converter(Map)
export class MapConverter implements IConverter {
    constructor(private converterService: ConverterService) {
    }

    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {Map<string, T>}
     */
    deserialize<T>(data: any, target: any, baseType: T): Map<string, T> {

        const obj = new Map<string, T>();

        Object.keys(data).forEach(key => {

            obj.set(key, <T>this.converterService.deserialize(data[key], baseType));

        });

        return obj;
    }

    /**
     *
     * @param data
     */
    serialize<T>(data: Map<string, T>): any {
        const obj: any = {};

        data.forEach((value: T, key: string) =>
            obj[key] = this.converterService.serialize(value)
        );

        return obj;
    }
}
