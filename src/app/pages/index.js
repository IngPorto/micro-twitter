import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { API_SERVER_ROUTE } from '../static-global-variables.json'
import Landing from '../components/Landing'

export default function Home() {
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

  const test = async ()=>{
    const res = await fetch( API_SERVER_ROUTE + '/api/twit/',
    {
      method: 'POST',
      body: JSON.stringify({
        "message": 'Testing 2',
        "owner": '5eaf47130b29bb337c8bc41b'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const twits = await res.json()
    if (twits){
      console.log(".........")
      console.log(twits)
    }
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
            <Landing user={user} setUser={setUser}/>
            :
            <p>Bienvenido { user.name }</p>
        }

        <Link href="/twit"  ><a>Twit trailing</a></Link>
        <Link href="/user"><a>User</a></Link>
        <button onClick={test}>Twit</button>

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
