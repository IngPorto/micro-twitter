import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { API_SERVER_ROUTE } from '../../static-global-variables.json'
import axios from 'axios'
import { formatDistanceToNow, parseISO } from 'date-fns'
import eslocale from 'date-fns/locale/es'
import TwitCard from '../TwitCard/TwitCard'

export default function Wall (props) {
    const [ twits, setTwits ] = useState([])
    const [ isThereMoreTwits, setIsThereMoreTwits ] = useState(true)
    const [ deltaTwitsPerRequest, setDeltaTwitsPerRequest ] = useState(parseInt(0))
    const [ loading, setLoading ] = useState(false)
    const maxTwitsPerRequest = 10 // paginación inicial
    const [ posicionPreviaDelScroll, setPosicionPreviaDelScroll ] = useState(0)
    // --
    const [ twitMessage, setTwitMessage ] = useState('')

    /**
     * Modifico el deltaTwitsPerRequest para crear un nuevo rango de consulta
     * cada vez que el usuario escrolee hasta el final
     */
    const startInfiniteScroll = () => {
        if ( (  window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) && isThereMoreTwits ){
            setDeltaTwitsPerRequest( prevDelta => parseInt(prevDelta + maxTwitsPerRequest) )
        }
        /* debug stuff
        console.log("scrollY: " + window.scrollY)
        console.log("maxScroll: " + (document.documentElement.scrollHeight - document.documentElement.clientHeight))
        console.log("allowFetchRequests: " + allowFetchRequests)
        console.log("deltaTwitsPerRequest: " + deltaTwitsPerRequest)
        console.log("_________________________" )
        */
    }

    /**
     * Efecto que hace seguimiento al scroll del usuario siempre que hayan 
     * más twits disponibles para mostrar. 
     * 
     * El removeEventListener se ejecuta cuando el efecto es nuevamente iniciado
     * y evita que hayan dos del mismo efecto corriendo. Se queda con el último.
     */
    useEffect( ()=>{
        window.addEventListener('scroll', startInfiniteScroll)
        return () => {
            window.removeEventListener('scroll', startInfiniteScroll);
        }
    },[isThereMoreTwits]) // isThereMoreTwits es una dependencia a observar para la lógica del effect

    /**
     * Efecto que trae los datos por primera vez de los twit con la paginación
     * por defecto. Después se queda vigilante al cambio de otra paginación 
     * para traer sus datos y inificarlos con los ya traidos.
     */
    useEffect( ()=>{
        //setLoading( true )
        let cancel
        axios({
            url: API_SERVER_ROUTE + `/api/twit/${parseInt(deltaTwitsPerRequest)}/${maxTwitsPerRequest}`,
            method: 'GET',
            cancelToken: new axios.CancelToken( c => cancel = c)
        }).then(res => {
            console.log( res.data )
            if ( !(res.data.length > 0) ) {
                setIsThereMoreTwits(false)
                console.log( "_________ No hay más twits ___________")
            }
            // Set almacena valores único, evita la duplicación.
            // Pero como devuelve un objeto se almacena cada valor en un nuevo array.
            setTwits( prevTwits => [ ...new Set ([ ...prevTwits, ...res.data])] )
            //setLoading( false )
        }).catch (e =>{
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    },[deltaTwitsPerRequest])


    const efectoOcultarHeaderAlScroll = () => {
        if(window.scrollY > posicionPreviaDelScroll ){
            // ocultar barra
            setPosicionPreviaDelScroll( window.scrollY )
            console.log("bajando")
            document.getElementById("search").style.top = '-47px'
            document.getElementById("search").style.transition = '0.5s'
        }
        else if( window.scrollY < posicionPreviaDelScroll ) {
            // aparecer barra
            setPosicionPreviaDelScroll( window.scrollY )
            console.log("subiendo")
            document.getElementById("search").style.top = '0'
            document.getElementById("search").style.transition = '0.5s'
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', efectoOcultarHeaderAlScroll)
        return () => {
            window.removeEventListener('scroll', efectoOcultarHeaderAlScroll);
        }
    }, [posicionPreviaDelScroll])

    
    /**
     * Necesito crear una consulta hacia los datos del usuario de cada twit usando su _id
     */
    const handleGetOwnerTwitPhotoSrc = () => {
        return '/img/user_default.png'
    }
    // Inutil por ahora
    const getOneUser = useCallback ( node => {
        if ( node && node.innerText[0] !== '@' ){
            axios({
                url: API_SERVER_ROUTE + `/api/user/${node.innerText}`,
                method: 'GET',
            }).then( res => {
                node.innerText = '@'+res.data.slug
                console.log ( res.data.name )

            })
        }
    })

    
    const handleSubmit = e =>{
        e.preventDefault()
    }
    
    const handleOpenTwitForm = e => {
        document.getElementById('twit-form-layout').classList.remove('d-none')
    }
    const handleCloseTwitForm = e => {
        document.getElementById('twit-form-layout').classList.add('d-none')
        // and clean all 
    }
    const handleTATwiting = e => {
        setTwitMessage( e.target.value )
        console.log( twitMessage )
    }
    const handleSendTwit = e => {
        e.preventDefault()
        if ( twitMessage.trim() != ''){
            axios({
                url: API_SERVER_ROUTE + `/api/twit`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    message: twitMessage,
                    owner: props.user._id,
                })
            })
            document.getElementById('twit-form-layout').classList.add('d-none')
        } else {
            document.getElementById('twit-form-layout-ta').classList.add('is-invalid')
        }
    }

    const scroll = ()=> {
        axios({
            url: API_SERVER_ROUTE + `/api/user/logout`,
            method: 'GET',
            withCredentials: 'include'
        }).then(res=>{
            props.setUser(null)
        })
    }

    

    return (
        <div className="wall">
            { /* Searchbar component*/ }
            <div className="search" id="search">
                <form className="p-1" onSubmit={handleSubmit}>

                    <div className="input-group">
                        <input type="text" className="form-control search-input" placeholder="Buscar en MicroTwitter" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark search-button" type="submit" id="button-addon2"><i className="fa fa-search"></i></button>
                        </div>
                    </div>

                    <div className="results-panel">
                        <div className="results">

                        </div>
                        <div className="seach-filters">

                        </div>
                    </div>
                </form>
            </div>

            <div className="timeline">
                {
                    twits && 
                        twits.map( twit => {
                            /* Twitcard component */
                            return (
                                <TwitCard twit={twit} user={props.user} key={twit._id}/>
                            )
                        })
                }

                <div className="end-sign text-center text-muted">
                    <p className="m-0 p-0">This is the end</p>
                    <p>•</p>
                </div>
            </div>
            
            { /* Twitform component */ }
            <div onClick={handleOpenTwitForm} className="open-twit-layout-button">
                <span className="open-twit-layout-icon"><i className="fa fa-bolt"></i></span>
            </div>
            <div id="twit-form-layout" className="twit-form-layout d-none">
                <form className="twit-form-layout-form" onSubmit={handleSendTwit}>
                    <div className="twit-form-layout-head mb-3">
                        <span onClick={handleCloseTwitForm} className="close-twitForm-button text-primary font-weight-bold h3"><i className="fa fa-times"></i></span>
                        <button type="submit" className="btn btn-primary font-weight-bold twit-boton">Enviar</button>
                    </div>
                    <textarea id="twit-form-layout-ta" onChange={handleTATwiting} className="twit-form-layout-ta form-control text-white" placeholder="¿Qué estás pensando?"></textarea>
                </form>
            </div>

            <div className="footer">
                <div className="items-container">
                    <span className="micro-profile texto-pequeno">
                        <img onClick={scroll} src={props.user.photo} />
                        <div className="description">
                            <p className="m-0 p-0 text-white">@{props.user.slug}</p>
                            <p className="m-0 p-0 text-white">
                                {props.user.following != '' ? props.user.following : 0 } <span className="text-secondary">siguiendo</span>
                                &emsp;
                                {props.user.following != '' ? props.user.following : 0 } <span className="text-secondary">seguiores</span>
                            </p>
                        </div>
                    </span>
                </div>
            </div>

            <style jsx>{`
            .search {
                position: fixed;
                width: 100%;
                z-index: 100;
            }
            .search-input {
            }
            .search-button {
                background-color: white;
            }
            .footer{
                position: fixed;
                left: -2px;
                bottom: -1px;
                width: 101vw;
                background-color: rgba(31, 31, 31, 0.9);
                padding: 6px;
                backdrop-filter: blur(5px);
                z-index: 100;
            }
            .micro-profile {
                display: flex;
                padding: 1px 5px;
            }
            .micro-profile img {
                background-color: white;
                width: 45px;
                height: 45px;
                border-radius: 23px;
                margin-right: 10px;
            }
            .texto-pequeno {
                font-size: 0.95rem;
            }



            .open-twit-layout-button {
                position: fixed;
                bottom: 75px;
                right: 20px;
                height: 55px;
                width: 55px;
                background-color: #2387d8;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
                z-index: 100;
            }
            .open-twit-layout-icon {
                color: white;
                font-size: 1.75rem;
            }
            .twit-form-layout {
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
                background-color: #1f1f1f;
                z-index: 100;
            }
            .twit-form-layout-form {
                width: 100%;
                padding: 15px
            }
            .twit-form-layout-head{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .twit-boton {
                border-radius: 19px;
                padding-left: 17px;
                padding-right: 17px;
            }
            .twit-form-layout-ta {
                resize: none;
                min-width: 100%;
                min-height: 200px;
                background: transparent;
            }
            .twit-form-layout-ta::placeholder {
                color: #5c94c5;
             }



            .timeline {
                padding-top: 56px;
                padding-bottom: 53px;
            }
            
            `}</style>
        </div>
    )
}