import { useEffect } from 'react';
export default function AdSenseLoader({ clientId }){
  useEffect(()=>{
    if(!clientId) return;
    const id = 'adsbygoogle-js';
    if(document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + clientId;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
    s.onload = () => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){} };
  }, [clientId]);
  useEffect(()=>{ try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){} });
  return null;
}