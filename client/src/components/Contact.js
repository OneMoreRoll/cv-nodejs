import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          subject:'',
          message: ''
        }
    }

    submitEmail(e){
        e.preventDefault();
        axios({
          method: "POST", 
          url:"/send", 
          data:  this.state
        }).then((response)=>{
          if (response.data.status === 'success'){
              alert("Message envoyé."); 
              this.resetForm()
          }else if(response.data.status === 'fail'){
              alert("Il y a eu une erreur.")
          }
        })
}

resetForm(){
        this.setState({name:'' , email:'' ,subject:'', message:''})
}

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    render() {
        return (
            <div className="contact">
                <h2 className="section_name">Contactez moi !</h2>

                <p>Une question, une demande ? Remplissez ce petit formulaire pour rentrer en communication avec moi.</p>

                <hr/>

                <form className="contact_form" onSubmit={this.submitEmail.bind(this)} method="POST">
                        <div className="form_wrapper">
                            <label htmlFor="username">Nom de l'utilisateur</label>
                            <input 
                                name="username" 
                                type="text" 
                                className="form_input" 
                                required value={this.state.name} 
                                onChange={this.onNameChange.bind(this)}/>
                        </div>

                        <div className="form_wrapper">
                            <label htmlFor="email">Adresse email</label>
                            <input 
                                name="email" 
                                type="text" 
                                className="form_input" 
                                required value={this.state.email} 
                                onChange={this.onEmailChange.bind(this)}/>
                        </div>

                        <div className="form_wrapper">
                            <label htmlFor="subject">Sujet du message</label>
                            <input
                                name="subject"
                                type="text"
                                className="form_input"
                                require value={this.state.subject}
                                onChange={this.onSubjectChange.bind(this)}/>
                        </div>

                        <div className="form_wrapper">
                            <label htmlFor="body">Corps du message</label>
                            <textarea
                                name="body" 
                                className="form_input" rows="5" 
                                required value={this.state.message}
                                onChange= {this.onMsgChange.bind(this)}/>
                        </div>

                    <button type="submit" className="submit">Envoyer</button>
                </form>

                <Link to="/cv" className="link return_link">Retour</Link>
            </div>
        );
    }
}