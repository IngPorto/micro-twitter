import React, { useState } from 'react'
import { API_SERVER_ROUTE } from '../static-global-variables.json'

export default function Landing ( props ) {
    const [ slug, setSlug ] = useState()
    const [ password, setPassword ] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const auth = await fetch( API_SERVER_ROUTE + '/api/user/auth', {
          method: 'POST',
          body: JSON.stringify({
            slug, 
            password
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const response = await auth.json()
        if ( response ){
            props.setUser(response)
        }
        console.log(response)
      }
    
    const handleChange = e => {
        switch (e.target.name) {
            case 'slug': setSlug(e.target.value); break;
            case 'password': setPassword(e.target.value); break;
        }
        console.log(e.target.value)
    }

    return(
        <div>
            <p>Micro Twitter</p>
              <p>Inicia</p>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="nickname" name="slug" onChange={handleChange} />
                <input type="password" placeholder="contraseña" name="password" onChange={handleChange} />
                <button type="submit">Entrar</button>
              </form>
        </div>
    )
}