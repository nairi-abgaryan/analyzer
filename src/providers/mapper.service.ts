import * as _ from 'lodash';

export class Mapper {

    /**
     * convert entity to dto class instance
     * @param {{new(entity: E, options: any): T}} model
     * @param {E[] | E} entity
     * @param options
     * @returns {T[] | T}
     */
    private static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E,
        options?: any,
    ): T;

    private static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E[],
        options?: any,
    ): T[];

    private static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E | E[],
        options?: any,
    ): T | T[] {
        if (_.isArray(entity)) {
            return entity.map(u => new model(u, options));
        }

        return new model(entity, options);
    }

    /**
     * @param model
     * @param entity
     * @param options
     */
    public static map<E, T>(
        entity: E,
        model: new (entity: E, options?: any) => T,
        options?: any
    ): T
    public static map<E, T>(
        entity: E[],
        model: new (entity: E, options?: any) => T,
        options?: any,
    ): T[];
    public static map<E, T>(
        entity: E[],
        model: new (entity: E, options?: any) => T,
        options?: any
    ): T | T[]{
        if (!_.isArray(entity)){
            return Mapper.toDto(model, entity, options)
        }
        return <T[]>_(entity)
            .map(item => Mapper.toDto(model, item, options))
            .compact()
            .value();
    }
}
