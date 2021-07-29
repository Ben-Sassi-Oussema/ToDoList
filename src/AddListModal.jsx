import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ListForm from './ListForm';
import Fire from './Fire'

// Déclaration du composant fonction 'AddListModal'
export default function AddListModal(props) {
    // Initialisation des variables d'état liées à notre formulaire HTML 
    const [lists, setLists] = useState(props.lists);

    const [name, setName] = useState(props.list === null ? "" : props.list.name);

    const [color, setColor] = useState(props.list === null ? "" : props.list.color);

    // Fonction appelée à la soumission du formulaire HTML 
    function handleSubmit() {
        //alert("La liste " + name + " a été créé avec la couleur " + color + ".");
        const firebase = new Fire((error) => {
            const list = {
                "name": name,
                "color": color,
                "tasks" : props.list ? props.list.tasks : []

            };
            if (props.list){
                list.id = props.list.id
                firebase.updateList(list);

            }else{
                
                firebase.addList(list);
            }
         
               
               // lists.push(list);
               // setLists(lists);
            
            
          });
    }

    return (
        <>
            <Modal
                title={props.title}
                visible={props.isVisible}
                onCancel={props.hideModal}
                footer={[
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Créer
                    </Button>
                ]}
            >
                <ListForm name={props.list === null ? "" : props.list.name} color={props.list === null ? "" : props.list.color} setName={setName} setColor={setColor} />
            </Modal>
        </>
    );
};