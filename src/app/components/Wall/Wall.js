import React, { useState, useEffect } from 'react'
import { API_SERVER_ROUTE } from '../../static-global-variables.json'
import axios from 'axios'

export default function Wall (props) {
    const [ twits, setTwits ] = useState([])
    const [ isThereMoreTwits, setIsThereMoreTwits ] = useState(true)
    const [ deltaTwitsPerRequest, setDeltaTwitsPerRequest ] = useState(parseInt(0))
    const [ allowFetchRequests, setAllowFetchRequests ] = useState(true)
    const maxTwitsPerRequest = 2

    const getTwits = async () => {
        const response = await fetch(API_SERVER_ROUTE + `/api/twit/${parseInt(deltaTwitsPerRequest)}/${maxTwitsPerRequest}`,
                {
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'include'
                }
            )
        const data = await response.json()
        return data;
    }

    const getInitialTwits = () => {
        setAllowFetchRequests( false ) // evitar que el scroll haga consultas sin haber terminado la antarior
        getTwits().then(data =>{
            setTwits([ ...twits, ...data])
            console.log("twits: " + twits)
            setAllowFetchRequests( true )
        })
        setDeltaTwitsPerRequest( prevDelta => parseInt(prevDelta + 2) )
        console.log("deltaTwitsPerRequest: " + deltaTwitsPerRequest)
    }

    //https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
    // si el scroll va para arriba se oculta, si va para abajo aparece con una animación
    const startInfiniteScroll = () => {
        window.addEventListener('scroll', e =>{
            if ( (  window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) && isThereMoreTwits && allowFetchRequests ){
                setAllowFetchRequests( false ) // evitar que el scroll haga consultas sin haber terminado la antarior
                getTwits().then( data => {
                    if( data.length > 0 ){
                        setTwits([ ...twits, ...data])
                        setAllowFetchRequests( true )
                        setIsThereMoreTwits ( false )
                        setDeltaTwitsPerRequest( prevDelta => parseInt(prevDelta + 2) )
                    }
                })
            }
            console.log("scrollY: " + window.scrollY)
            console.log("maxScroll: " + (document.documentElement.scrollHeight - document.documentElement.clientHeight))
            console.log("allowFetchRequests: " + allowFetchRequests)
            console.log("deltaTwitsPerRequest: " + deltaTwitsPerRequest)
            console.log("_________________________" )
        })
    }
    //startInfiniteScroll()

    const startInfiniteScroll_2 = () => {
        if ( (  window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) && isThereMoreTwits ){
            setDeltaTwitsPerRequest( prevDelta => parseInt(prevDelta + 2) )
        }
    }
    //startInfiniteScroll_2()

    useEffect( ()=>{
        window.addEventListener('scroll', startInfiniteScroll_2)
        return () => {
            window.removeEventListener('scroll', startInfiniteScroll_2);
        }
    },[isThereMoreTwits]) // isThereMoreTwits es una dependencia a observar para la lógica del effect

    // función que se va hacer cada vez que
    // 1. el scroll llega abajo
    useEffect( ()=>{
        //getInitialTwits()
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
        }).catch (e =>{
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    },[deltaTwitsPerRequest])

    const handleSubmit = e =>{
    }

    /**
     * Necesito crear una consulta hacia los datos del usuario de cada twit usando su _id
     */
    const handleGetOwnerTwitPhotoSrc = () => {
        return '/img/user_default.png'
    }

    const scroll = ()=> {
    }

    return (
        <div className="wall">
            <div className="search">
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <input value={deltaTwitsPerRequest} type="text" className="form-control" placeholder="Buscar en MicroTwitter" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2"><i className="fa fa-search"></i></button>
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
                            return (
                            <div className="twit" key={twit._id}>
                                <div className="twit-head">
                                    <img className="img-twit" src={handleGetOwnerTwitPhotoSrc} />
                                    <div className="texto-pequeno">
                                        <p>{twit.owner} • {twit.creation_time}</p>
                                        <p className="twit-message">{twit.message}</p>
                                    </div>
                                </div>
                                <div className="twit-image">
                                </div>
                                <div className="twit-foot">
                                    <p><i className="fa fa-heart"></i> {twit.likes != '' ? twit.likes : 0}</p>
                                    <p><i className="fa fa-retweet"></i> {twit.shares != '' ? twit.shares : 0}</p>
                                    <p><i className="fa fa-comment"></i> {twit.comments.length}</p>
                                </div>
                            </div>
                            )
                        })
                }
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
                .footer{
                    position: fixed;
                    left: 0;
                    bottom: -1px;
                    width: 100vw;
                    background-color: #1f1f1f;
                    padding: 6px;
                }
                .micro-profile {
                    display: flex;
                }
                .micro-profile img {
                    background-color: white;
                    width: 45px;
                    height: 45px;
                    border-radius: 23px;
                    margin-right: 6px;
                }
                .texto-pequeno {
                    font-size: 0.95rem;
                }

                .timeline {
                }
                .twit {
                    padding: 0 15px;
                    border-bottom-style: solid;
                    border-bottom-color: #cecece;
                    border-bottom-width: 1px;
                    margin-bottom: 15px;
                }
                .twit-head {
                    display: flex;
                }
                .twit-foot {
                    display: flex;
                    justify-content: space-around;
                }
                .img-twit {
                    background-color: #1f1f1f;
                    width: 45px;
                    min-width: 45px;
                    height: 45px;
                    border-radius: 23px;
                    margin-right: 6px;
                }
            `}</style>
        </div>
    )
}