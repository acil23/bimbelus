"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({title,children,onClose,busy = false}: {title:string;children:ReactNode;onClose:()=>void;busy?:boolean}) {
 const dialog = useRef<HTMLDialogElement>(null); const id = useId();
 useEffect(()=>{ const element = dialog.current; const previous = document.activeElement as HTMLElement | null; const overflow = document.body.style.overflow; document.body.style.overflow = "hidden"; element?.showModal(); return ()=>{ element?.close(); document.body.style.overflow = overflow; previous?.focus(); }; },[]);
 return <dialog ref={dialog} className="modal" aria-labelledby={id} onCancel={(event)=>{event.preventDefault();if(!busy) onClose();}}><div className="modal-head"><h2 id={id}>{title}</h2><button type="button" className="icon-btn" disabled={busy} aria-label="Tutup dialog" onClick={onClose}><X size={20} /></button></div><div className="modal-body">{children}</div></dialog>;
}
