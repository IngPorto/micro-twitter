import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_SERVER_ROUTE } from '../../static-global-variables.json'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import eslocale from 'date-fns/locale/es'
import LoandingSpinner from '../../components/LoandingSpinner/LoandingSpinner'
import TwitCard from '../../components/TwitCard/TwitCard'

 const Twit = () => {
    const router = useRouter()
    const [ twitID, setTwitID ] = useState() 
    const [ twit, setTwit ] = useState() 
    const [ comments, setComments ] = useState() 
    const [ user, setUser ] = useState()

    const checkSession = async ()=>{
        const res = await fetch( API_SERVER_ROUTE + '/api/user/session',{credentials: 'include'})
        const sessionPrevia = await res.json()
        if (sessionPrevia){
            setUser(sessionPrevia)
            console.log("sesión previa encontrada")
            console.log(sessionPrevia)
        }
    }

    
    useEffect( ()=>{
        checkSession()
    },[])
  

    /**
     * Efecto para obtener el id del twit una vez la página ya esté lista
     */
    useEffect( () => {
        setTwitID(router.query.twit_id)
    }, [router])

    /**
     * Efecto para cargar los datos del twit del servidor
     */
    useEffect( ()=>{
        let cancel
        axios({
            url: API_SERVER_ROUTE + `/api/twit/${twitID}`,
            method: 'GET',
            cancelToken: new axios.CancelToken( c => cancel = c)
        }).then(res => {
            if ( res.data[0] ){
                console.log( res.data[0] )
                setTwit( res.data[0] )
            }
        }).catch (e =>{
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    },[twitID])

    /**
     * Efecto para cargar los comentarios del twit
     */
    useEffect( ()=>{
        if ( twit ){
            let cancel
            axios({
                url: API_SERVER_ROUTE + `/api/twit/comments`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    comments: twit.comments
                }),
                cancelToken: new axios.CancelToken( c => cancel = c)
            }).then(res => {
                if ( res.data[0] ){
                    console.log('opteniendo los comentarios')
                    console.log(res.data)
                    setComments( res.data )
                }
            }).catch (e =>{
                if (axios.isCancel(e)) return
            })
            return () => cancel()
        }
    },[twit])

    const handleLike = () => {

    }

    const handleShare = () => {
        
    }

    return (
        <div>
            <div>
                <span className="go-back-btn"><i className="fa fa-arrow-left"></i></span>
                <p>Tweet { twitID }</p>
            </div>
            {
            twit ? 
                <div className="twit" >
                    <div className="twit-head">
                        <img src={twit.ownerDetails[0].photo}/>
                        <div>
                            <p>{twit.ownerDetails[0].name}</p>
                            <span>•</span>
                        {
                        user &&
                            <p>Seguir</p>
                        }
                        </div>
                    </div>
                    <div className="twit-message">
                        <p>
                            { twit.message }
                        </p>
                    </div>
                    {
                        twit.image &&
                            <div className="twit-image">
                                <img src={twit.image}/>
                            </div>
                    }
                    {
                        user &&
                            <div className="twit-interation-options">
                                <p onClick={() => handleLike(twit._id)} className="like-btn text-muted">
                                    <i id={`like-icon-${twit._id}`} className={`fa fa-heart mr-2 ${twit.likes.indexOf( user._id ) > (-1) && 'text-danger'}`}></i> 
                                </p>
                                <p onClick={() => handleShare(twit._id)} className="share-btn text-muted">
                                    <i id={`share-icon-${twit._id}`} className={`fa fa-retweet mr-2 ${twit.shares.indexOf( user._id ) > (-1) && 'text-success'}`}></i>
                                    <span id={`share-value-${twit._id}`} >{twit.shares != '' ? twit.shares.length : 0}</span>
                                </p>
                            </div>
                    }
                    {
                        user &&
                            <div className="twit-stadistics">
                                <p>
                                    <span className="mr-1">Me gusta</span>
                                    <span id={`like-value-${twit._id}`} className="mr-2">{twit.likes != '' ? twit.likes.length : 0}</span>
                                    <span className="mr-1">Compartido</span>
                                    <span id={`share-value-${twit._id}`} className="">{twit.shares != '' ? twit.shares.length : 0}</span>
                                </p>
                            </div>
                    }
                    <div className="twit-date">
                        {
                            format ( parseISO(twit.creation_time), 'h:mm aaaa • d LLL. yy', {locale: eslocale}).toString()
                        }
                    </div>
                    {
                        comments &&
                        <div className="twit-comments">
                            {
                                comments.map(comment => {
                                    return(
                                        <TwitCard twit={comment} user={user} key={comment._id}/>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                :
                <div>Loading...</div>
                /* <LoandingSpinner /> */
            }
        </div>
    )
}

export default Twit