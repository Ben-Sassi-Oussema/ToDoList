import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Fire from './Fire';

// Import de mes composants utiles 
import AddButton from "./AddButton";
import AddListModal from './AddListModal';
import { Card ,Spin, Button} from 'antd';

export default function App() {
  // Initialisation de la variable d'état 'isModalVisible' à 'false' et de sa fonction de mise à jour 'setIsModalVisible()'
  const [list, setList] = useState(null);
  
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  //console.log(list);

  useEffect(() => {
    const firebase = new Fire((error) => {
      if (error) {
        setError(error);
      } else {
        firebase.getLists(lists => {
          setLists(lists);
          setLoading(false);
        });
      }
      return function unsubscribe() {
        firebase.detach();
      }
    });
  }, []);

  //console.log(lists);
   if(error){
    return <p>Erreur : {error.message}</p>
  }else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Bienvenue sur mon application de gestion de listes
          </p>
          {loading === true  ? (
            <Spin/>
          ): ''}
          {lists.map(list => (
            <Card title={<p style={{color: list.color}}>{list.name}</p>}  style={{ width: 300 }}>
              <ul>
              {list.tasks.map(task => (
                <li>{task.title}</li>
              ))}
              </ul>
              <Button onClick={() => {
                setIsModalVisible(true);
                setList(list);
              } }> Modifier </Button>
              <Button 
                danger
                onClick={() =>{
                  const firebase = new Fire(() => {
                    firebase.deleteList(list)
                  });

                }}
              > 
                Supprimer</Button>

              <p>Mes Taches</p>
            </Card>
          ))}

          <AddButton content="Ajouter une liste" onClick={() => showModal()} 
           onClick={() => {
            setIsModalVisible(true);
            setList(null);


           }

           }
          />
         
          <AddListModal 
           list={list}
          
           title={list ?  "Modifier la liste" +  list.name :  "Ajouter une liste"} 
           isVisible={isModalVisible} 
           hideModal={hideModal} 
           lists ={lists}
          />
        </header>
      </div>
    );


  }
  // Fonction chargé d'afficher la fenêtre modale en passant à 'true' la variable d'état 'isModalVisible'
  function showModal() {
    setIsModalVisible(true);
  };

  // Fonction chargé de masquer la fenêtre modale en passant à 'false' la variable d'état 'isModalVisible'
  function hideModal() {
    setIsModalVisible(false);
  };




}

//export default App;
