const find = ( Model ) => ({ query = {}, populate = "", sort = {}, limit = undefined, skip = 0 } = {}) =>
    Model
        .find(query)
        .populate( populate )
        .sort( sort )
        .limit( limit )
        .skip( skip )
        .exec();

const findAll = ( Model ) => ({ query = {}, populate = "", select = undefined, sort = {}, limit = undefined, skip = 0 } = {}) =>
    Model
        .find(query)
        .populate( populate )
        .select( select )
        .sort( sort )
        .limit( limit )
        .skip( skip )
        .lean()
        .exec();

const findOne = ( Model ) => ( query = {}, populate = "") =>
    Model
        .findOne( query )
        .populate( populate )
        .exec();

const aggregate = ( Model ) => ( query = {}) =>
    Model
        .aggregate( query )
        .exec();

const count = ( Model ) => ( query = {} ) => Model.count( query ).exec();

const remove = ( Model ) => ( query = {} ) => Model.findOne( query ).remove();

const save = ( Model ) => (object) => new Model(object).save();

const update = ( Model ) => ( object ) => {
    // console.log("update", object);

    if(!object || !object._id){
        throw new Error("Missing object or _id. Object: " + JSON.stringify(object));
    }else{
        return Model.findOneAndUpdate(
            { _id: object._id },
            { $set: object },
            {
                new: true,  //if true, return the modified document rather than the original. defaults to false (changed in 4.0)
                upsert: false   //creates the object if it doesn't exist. defaults to false.
            }).exec();
    }
};

module.exports = ( Model ) => ({
    find: find(Model),
    findAll: findAll(Model),
    aggregate: aggregate(Model),
    findOne: findOne(Model),
    count: count(Model),
    remove: remove(Model),
    save: save(Model),
    update: update(Model),
});