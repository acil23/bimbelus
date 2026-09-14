"use client";
import { useRef,useState,type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye,EyeOff,ArrowRight } from "lucide-react";
import { login } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
export default function LoginForm(){
 const router=useRouter();const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [show,setShow]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState("");const lock=useRef(false);
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError("");try{await login(email.trim(),password);router.replace("/admin/dashboard");router.refresh();}catch(cause){setError(cause instanceof ApiClientError ? (cause.status===401?"Email atau kata sandi tidak sesuai.":cause.status===429?"Terlalu banyak percobaan. Tunggu sebentar sebelum mencoba lagi.":cause.message):"Tidak dapat terhubung. Coba lagi.");}finally{lock.current=false;setBusy(false);}}
 return <form className="stack" onSubmit={submit} aria-busy={busy}>{error && <div className="alert alert-error" role="alert">{error}</div>}<div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required value={email} disabled={busy} onChange={(event)=>setEmail(event.target.value)} placeholder="Email akun admin" /></div><div className="field"><label htmlFor="password">Kata sandi</label><div className="password-field"><input id="password" name="password" type={show?"text":"password"} autoComplete="current-password" required value={password} disabled={busy} onChange={(event)=>setPassword(event.target.value)} /><button type="button" className="icon-btn" aria-controls="password" aria-label={show?"Sembunyikan kata sandi":"Tampilkan kata sandi"} aria-pressed={show} onClick={()=>setShow(!show)}>{show?<EyeOff size={20}/>:<Eye size={20}/>}</button></div></div><button type="submit" className="btn btn-gold" disabled={busy}>{busy?"Memproses…":"Masuk"}<ArrowRight size={18} aria-hidden="true" /></button></form>;
}
