import {firebaseDatabase} from '../utils/firebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath).limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

    static getDataListWhere = (nodePath, key, value, callback, size = 10,) => {
        let query = firebaseDatabase.ref(nodePath).limitToLast(size).orderByChild(key).equalTo(value);

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    }

    static getUniqueDataBy = (node, id, callback) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        let newData = {};
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
                callback(null);
                return;
            }

            const snap = dataSnapshot.val();
            const keys = Object.keys(snap);
            keys.forEach((key) => {
                newData[key] = snap[key]
            });
        }).then(() => {
            callback(newData);
        });
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static setData = (node, objToSubmit) => {
        return firebaseDatabase
        .ref(node)
        .set(objToSubmit)
    }; 

    static changeData = (node, objToSubmit) => {
        return firebaseDatabase
        .ref(node)
        .update(objToSubmit)
    }; 
    
    static editData = (node, key, obj) => {
        let ref = firebaseDatabase.ref(node);
        return ref.child(key).update(obj);
    };

    static updateData = (node, objToSubmit) => {
        return firebaseDatabase.ref(node).update(objToSubmit);
    };

    static remove = (node, key) => {
        return firebaseDatabase.ref(node + '/' + key).remove();
    };

}   
