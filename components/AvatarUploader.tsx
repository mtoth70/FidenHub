"use client";
import { useRef, useState } from "react";

export default function AvatarUploader({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (url: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    onChange(url);
  }

  return (
    <div style={{display:"grid", placeItems:"center"}}>
      <div
        style={{
          width:72, height:72, borderRadius:"50%", overflow:"hidden",
          border:"1px solid var(--border)", background:"#f1f5f9"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview || "/avatar-placeholder.png"} alt="avatar" style={{width:"100%", height:"100%", objectFit:"cover"}} />
      </div>
      <button className="btn btn-sm" style={{marginTop:8}} onClick={()=>fileRef.current?.click()}>Cambiar</button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile}/>
    </div>
  );
}
