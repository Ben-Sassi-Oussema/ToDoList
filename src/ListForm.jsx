import React from "react";
import { Input } from 'antd';

export default function ListForm(props) {
    //console.log(props.name);
    // Fonction appelée à chaque changement survenu sur un champ des champs du formulaire 
    function handleChange(event) {
        switch (event.target.name) {
            case "name":
                props.setName(event.target.value); // Met à jour le nom 
                break;
            case "color":
                props.setColor(event.target.value); // Met à jour la couleur  
                break;
            default:
                break;
        }
    }

    return (
        <form>
            <label htmlFor="name">Nom</label>
            <Input placeholder="Nom de la liste" onChange={handleChange} name="name" id="name" value={props.name} />
            <label htmlFor="color">Couleur</label>
            <Input type="color" onChange={handleChange} name="color" id="color" value={props.color} />
        </form>
    );
}