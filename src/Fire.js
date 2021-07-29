import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBJ0u5-79BQ8cBIxrnywES_hjm4WEQg_n8",
    authDomain: "reactjs-dcfbf.firebaseapp.com",
    projectId: "reactjs-dcfbf",
    storageBucket: "reactjs-dcfbf.appspot.com",
    messagingSenderId: "837854478006",
    appId: "1:837854478006:web:7a6f8453919ead26f43017",
    measurementId: "G-8LKZ1B974K"
  };

export default class Fire{
    constructor(callback){
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user =>{
            if (user){
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error =>{
                    callback(error);
                });
            }
        
        });
    }

    get ref(){
        return firebase.firestore().collection("list");
    }

    getLists(callback){
        let ref=this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot =>{
            let lists =[];
            snapshot.forEach(doc =>{
                lists.push({ id : doc.id, ...doc.data() });
            });
            callback(lists);
            
        }, function(error){
            callback(error);
        });
    }

    addList(list){
        this.ref.add(list);

    }

    deleteList(list){
        this.ref.doc(list.id).delete();

    }

    updateList(list){
        this.ref.doc(list.id).update(list);
    }

    detach(){
        this.unsubscribe();
    }
}