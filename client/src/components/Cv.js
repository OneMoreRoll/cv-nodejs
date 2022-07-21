import React, { Component } from 'react';
import { Row, Col, Progress } from 'antd';
import axios from "axios";
import { getToken } from '../Utils/Common';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faAt, faCar } from '@fortawesome/free-solid-svg-icons'

import '../App.css';

export default class Cv extends Component {
    constructor(props) {
        super(props);
        this.state = {
        web: {},
        os: {},
        adobe: {},
        software: {},
        language: {},
        experiences: {},
        formations: {},
        username:'',
        password:''
        }
    }
    
    async getAPI() {
        let endpoints = [
            '/api/skills?subject=web',
            '/api/skills?subject=os',
            '/api/skills?subject=adobe',
            '/api/skills?subject=software',
            '/api/skills?subject=language',
            '/api/experiences',
            '/api/formations'
          ];
            
        let auth = getToken(); 
        if (auth) {
                return Promise.all(endpoints.map((endpoint) => axios
                .get(
                    endpoint, {
                    headers: { Authorization: `Bearer ${auth}` }})))
                .then(([{data: web}, {data: os}, {data: adobe}, {data: software}, {data: language}, {data: experiences}, {data: formations}]) => {
                    this.setState({ web, os, adobe, software, language, experiences, formations })
                    console.log( web, os, adobe, software, language, experiences, formations );
                });
            }
    }

    componentDidMount = () => {
        this.getAPI();
    };

    render() {
        const formationList = this.state.formations.data?.map(formation => {
            return (
                <>
                <Col key={formation.id} className="formation_list" xs={8} sm={8} md={10} lg={10} xl={10}>
                    <div className="formation_wrapper">
                        <h3>{formation.name} {formation.option}</h3>
                        <h2>{formation.place}</h2>
                        <div className="formation_logo_wrapper">
                            <img src={formation.logo} alt={formation.name} />
                        </div>
                        <h4>{formation.degree}</h4>
                        <h4>{formation.firstyear} - {formation.lastyear}</h4>
                    </div>
                </Col>
                </>
            );
        });

        const webSkillList = this.state.web.data?.map(skill => {
            return (
                <>
                <Col key={skill.id} className="skill_list" xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Progress 
                        type="circle" 
                        percent={skill.mastery} 
                        format={() => skill.name} 
                    />
                    <div className="skill_image_wrapper">
                        <img
                            alt={skill.name}
                            src={`${process.env.PUBLIC_URL}/img/skills/${skill.name.replaceAll('.', '').replaceAll(' ', '')}.png`}
                        />
                    </div>
                </Col>
                </>
            );
        });

        const osSkillList = this.state.os.data?.map(skill => {
            return (
                <>
                <Col key={skill.id} className="skill_list" xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Progress 
                        type="circle" 
                        percent={skill.mastery} 
                        format={() => skill.name} 
                    />
                    <div className="skill_image_wrapper">
                        <img
                            alt={skill.name}
                            src={`${process.env.PUBLIC_URL}/img/skills/${skill.name.replaceAll('.', '').replaceAll(' ', '')}.png`}
                        />
                    </div>
                </Col>
                </>
            );
        });

        const adobeSkillList = this.state.adobe.data?.map(skill => {
            return (
                <>
                <Col key={skill.id} className="skill_list" xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Progress 
                        type="circle" 
                        percent={skill.mastery} 
                        format={() => skill.name} 
                    />
                    <div className="skill_image_wrapper">
                        <img
                            alt={skill.name}
                            src={`${process.env.PUBLIC_URL}/img/skills/${skill.name.replaceAll('.', '').replaceAll(' ', '')}.png`}
                        />
                    </div>
                </Col>
                </>
            );
        });

        const softwareSkillList = this.state.software.data?.map(skill => {
            return (
                <>
                <Col key={skill.id} className="skill_list" xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Progress 
                        type="circle" 
                        percent={skill.mastery} 
                        format={() => skill.name} 
                    />
                    <div className="skill_image_wrapper">
                        <img
                            alt={skill.name}
                            src={`${process.env.PUBLIC_URL}/img/skills/${skill.name.replaceAll('.', '').replaceAll(' ', '')}.png`}
                        />
                    </div>
                </Col>
                </>
            );
        });

        const languageSkillList = this.state.language.data?.map(skill => {
            return (
                <>
                <Col key={skill.id} className="skill_list" xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Progress 
                        type="circle" 
                        percent={skill.mastery} 
                        format={() => skill.name} 
                    />
                    <div className="skill_image_wrapper">
                        <img
                            className="flag"
                            alt={skill.name}
                            src={`${process.env.PUBLIC_URL}/img/skills/${skill.name.replaceAll('.', '').replaceAll(' ', '')}.png`}
                        />
                    </div>
                </Col>
                </>
            );
        });

        const experienceList = this.state.experiences.data?.map(experience => {
            console.log(experience.tasks);
            return (
                <>
                <Col key={experience.id} className="experience_list" xs={8} sm={8} md={10} lg={10} xl={10}>
                    <div className="experience_wrapper">
                        <h2>{experience.job} chez {experience.company}, en {experience.year}</h2>
                        <h3>Environnement : {experience.environment}</h3>
                        <p className="duration">{experience.duration > 1 ? experience.duration + "ans" : Math.round(12 * experience.duration) + " mois"}</p>
                        <div className="tasks_xp">
                            <h4 className="tasks">Tâches réalisées : </h4>
                            <p>{experience.tasks.join("\r\n")}</p>
                        </div>
                        <div className="skills_xp">
                            <h4 className="skill_list_xp">Compétences et logiciels mis en avant : </h4>
                            <p>{experience.softwares.join(", ")}</p>
                        </div>
                    </div>
                </Col>
                </>
            );
        });


        return (
                <div className="cv_container">
                    <div className="top_of_page">
                        <div className="logo_wrapper">
                            <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo"/>
                        </div>
                        <div className="infos">
                            <h1>À propos de moi</h1>

                            <div className="infos_wrapper">
                                <div className="info_wrapper">
                                    <FontAwesomeIcon icon={faHouse} className="icon" />
                                    <h3>Adresse :</h3>
                                    <p>36 rue de Strasbourg, 93200 Saint-Denis</p>
                                </div>

                                <div className="info_wrapper">
                                    <FontAwesomeIcon icon={faPhone} className="icon" />
                                    <h3>Téléphone :</h3>
                                    <p>06 86 00 35 50</p>
                                </div>

                                <div className="info_wrapper">
                                    <FontAwesomeIcon icon={faAt} className="icon" />
                                    <h3>Mail :</h3>
                                    <p>gauthier.delhaye@hotmail.com</p>
                                </div>

                                <div className="info_wrapper">
                                    <FontAwesomeIcon icon={faCar} className="icon" />
                                    <h3>Permis :</h3>
                                    <p>Permis B, véhiculé</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="formation_container">
                        <h1>Mes formations</h1>

                        <div className="formation_list_container">
                            <Row className="formation_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                {formationList}
                            </Row>
                        </div>
                    </div>

                    <div className="skills_container">
                        <h1>Mes compétences</h1>

                        <div className="web_container">
                            <Row className="skill_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <h2>Web</h2>
                                <div className="web_list">
                                    {webSkillList}
                                </div>
                            </Row>
                        </div>

                        <div className="os_container">
                            <Row className="skill_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <h2>Systèmes d'exploitation</h2>
                                <div className="os_list">
                                    {osSkillList}
                                </div>
                            </Row>
                        </div>

                        <div className="adobe_container">
                            <Row className="skill_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <h2>Suite Adobe</h2>
                                <div className="adobe_list">
                                    {adobeSkillList}
                                </div>
                            </Row>
                        </div>

                        <div className="software_container">
                            <Row className="skill_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <h2>Autres logiciels</h2>
                                <div className="software_list">
                                    {softwareSkillList}
                                </div>
                            </Row>
                        </div>

                        <div className="language_container">
                            <Row className="skill_list_wrapper" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <h2>Langues</h2>
                                <div className="language_list">
                                    {languageSkillList}
                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className="experience_container">
                        <h1>Mes expériences</h1>

                        <div className="experience_list_container">
                            <Row className="experience_list" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                {experienceList}
                            </Row>
                        </div>
                    </div>

                    <div className="contact_link_wrapper">
                        <h3>Mon profil vous intéresse ?</h3>
                        <Link to="/contact" className="link">Envoyez-moi un message !</Link>
                    </div>
                </div>
        );
    }
}
