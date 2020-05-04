import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [ slug, setSlug ] = useState()
  const [ password, setPassword ] = useState()
  const [ user, setUser ] = useState()

  useEffect(async ()=>{
    const res = await fetch('/api/user/session')
    const sessionPrevia = await res.json()
    if (sessionPrevia){
      setUser(sessionPrevia)
      console.log("sesión previa encontrada")
      console.log(sessionPrevia)
    }
  },{})

  const handleSubmit = async e => {
    e.preventDefault()
    const auth = await fetch('/api/user/auth', {
      method: 'POST',
      body: JSON.stringify({
        slug, 
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const response = await auth.json()
    if ( response ){
      setUser(response)
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

  return (
    <div className="container">
      <Head>
        <title>Micro Twitter</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://raw.githubusercontent.com/daneden/animate.css/master/animate.css" />
      </Head>

      <main>
        { 
          !user ? 
            <div>
              <p>Micro Twitter</p>
              <p>Inicia</p>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="nickname" name="slug" onChange={handleChange} />
                <input type="password" placeholder="contraseña" name="password" onChange={handleChange} />
                <button type="submit">Entrar</button>
              </form>
            </div>
            :
            <p>Bienvenido { user.name }</p>
        }

        <Link href="/twit" as="/t"><a>Twit</a></Link>
        <Link href="/user" as="/u"><a>User</a></Link>

      </main>

      { /*Scripts*/ }
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

      <style jsx>{`
      `}</style>

      <style jsx global>{`

      `}</style>
    </div>
  )
}
