const f=document.getElementById('f'), inp=document.getElementById('inp'), err=document.getElementById('err'),
lbl=document.getElementById('lbl'), swap=document.getElementById('swap'), toast=document.getElementById('toast');
let email=false;
swap.onclick=()=> {
  email=!email;
  inp.type=email?'email':'tel';
  lbl.textContent=email?'Email':'Phone number';
  swap.textContent=email?'Continue with phone':'Continue with email';
  inp.value='';
  err.hidden=true;
  inp.focus()
};
f.onsubmit=e=> {
  e.preventDefault();
  const v=inp.value.trim();
  const ok=email?/^\S+@\S+\.\S+$/.test(v):/^[0-9 ()-]{7,15}$/.test(v);
  err.hidden=ok;
  err.textContent=email?'Enter a valid email address.':'Enter a valid phone number.';
  toast.hidden=!ok;
  if(ok)inp.value='';
};
