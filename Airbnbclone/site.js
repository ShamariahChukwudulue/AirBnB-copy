(function() {
  const btn=document.querySelector('.menu-btn'); if(!btn) return;
  const wrap=btn.parentElement; wrap.style.position='relative';
  const m=document.createElement('div'); m.className='menu-dropdown'; m.hidden=true;
  m.innerHTML=`<a href="#">Help Center</a><a href="#"><b>Become a host</b><small>It's easy to start hosting and earn extra income.</small></a><a href="#">Refer a Host</a><a href="#">Find a co-host</a><a href="#">Gift cards</a><hr><a href="#">Log in or sign up</a>`;
  m.addEventListener('click', e=> {
    if(e.target.closest('a'))e.preventDefault()
  });
  wrap.appendChild(m);
  btn.addEventListener('click', e=> {
    e.stopPropagation();m.hidden=!m.hidden
  });
  document.addEventListener('click', e=> {
    if(!m.contains(e.target))m.hidden=true
  });
  document.addEventListener('keydown', e=> {
    if(e.key==='Escape')m.hidden=true
  });
})();
document.querySelectorAll('.popular').forEach(sec=> {
  const row=sec.querySelector('.cards-row'), btns=sec.querySelectorAll('.arrow-btn');
  if(!row||btns.length<2) return;
  const [p, n]=btns, step=()=>2*(row.querySelector('.home-card').offsetWidth+12);
  const upd=()=> {
    p.disabled=row.scrollLeft<=2; n.disabled=row.scrollLeft+row.clientWidth>=row.scrollWidth-2
  };
  p.onclick=()=>row.scrollBy( {
    left:-step(), behavior:'smooth'
  });
  n.onclick=()=>row.scrollBy( {
    left:step(), behavior:'smooth'
  });
  row.addEventListener('scroll', upd); addEventListener('resize', upd); upd();
});
const S=s=>s.split(',').map(x=>x.trim().split('|'));
const INSP= {
  "Popular":[S("Dallas|House rentals,North Myrtle Beach|Vacation rentals,Portland|Monthly Rentals,Nice|Monthly Rentals,Barcelona|Monthly Rentals,Cleveland|Vacation rentals,Galveston|Cottage rentals,Kauai|Monthly Rentals,Raleigh|Villa rentals,Portland|Vacation rentals,Minneapolis|Vacation rentals,Amsterdam|Condo rentals,Philadelphia|Condo rentals,Orange Beach|Monthly Rentals,Gulf Shores|Apartment rentals,Tokyo|Vacation rentals,St. Petersburg|Monthly Rentals"), S("Miami|Condo rentals,Austin|House rentals,Rome|Apartment rentals,Lisbon|Monthly Rentals,Denver|Vacation rentals,Paris|Apartment rentals")],
  "Arts & culture":[S("Los Angeles|Vacation rentals,New York|Apartment rentals,Nashville|House rentals,Chicago|Condo rentals,Santa Fe|Cottage rentals,San Francisco|Apartment rentals,New Orleans|Vacation rentals,Savannah|House rentals,Florence|Apartment rentals,Berlin|Monthly Rentals,Mexico City|Condo rentals"), S("Vienna|Apartment rentals,Prague|Monthly Rentals,Kyoto|House rentals,Madrid|Apartment rentals,Brooklyn|Condo rentals,Philadelphia|House rentals")],
  "Beach":[S("Myrtle Beach|Vacation rentals,Destin|Condo rentals,Maui|Vacation rentals,San Diego|Beach house rentals,Key West|Cottage rentals,Honolulu|Condo rentals,Cancun|Villa rentals,Malibu|Beach house rentals,Bali|Villa rentals,Cape Cod|Cottage rentals,Phuket|Villa rentals"), S("Tulum|Vacation rentals,Gold Coast|Apartment rentals,Algarve|Villa rentals,Clearwater|Condo rentals,Outer Banks|House rentals,Cape Town|Villa rentals")],
  "Mountains":[S("Gatlinburg|Cabin rentals,Big Bear Lake|Cabin rentals,Park City|Condo rentals,Aspen|Chalet rentals,Lake Tahoe|Cabin rentals,Breckenridge|Condo rentals,Asheville|Cabin rentals,Banff|Chalet rentals,Estes Park|Cabin rentals,Zermatt|Chalet rentals,Jackson|Cabin rentals"), S("Telluride|Condo rentals,Sevierville|Cabin rentals,Chamonix|Chalet rentals,Innsbruck|Apartment rentals,Boone|Cabin rentals,Mammoth Lakes|Condo rentals")],
  "Outdoors":[S("Sedona|Vacation rentals,Moab|Cabin rentals,Joshua Tree|House rentals,Yosemite|Cabin rentals,Bend|House rentals,Lake Placid|Cabin rentals,Zion|Cottage rentals,Flagstaff|Cabin rentals,Hocking Hills|Cabin rentals,Glacier|Cabin rentals,Page|Vacation rentals"), S("Pigeon Forge|Cabin rentals,Fredericksburg|Cottage rentals,Lake Geneva|House rentals,Smoky Mountains|Cabin rentals,Queenstown|House rentals,Hood River|Cabin rentals")],
  "Things to do":[S("Orlando|Vacation rentals,Las Vegas|Condo rentals,Anaheim|House rentals,Branson|Cabin rentals,Napa|Vacation rentals,Williamsburg|House rentals,Seattle|Apartment rentals,London|Apartment rentals,Dubai|Apartment rentals,Sydney|Apartment rentals,Singapore|Condo rentals"), S("Boston|Condo rentals,Washington|Apartment rentals,Edinburgh|Apartment rentals,Istanbul|Apartment rentals,Toronto|Condo rentals,Bangkok|Condo rentals")],
  "Travel tips & inspiration":[S("Family travel|Tips,Solo trips|Inspiration,Road trips|Ideas,Pet-friendly|Stays,Group getaways|Ideas,Long stays|Tips,Weekend escapes|Inspiration,Workations|Tips,Winter getaways|Ideas,Budget travel|Tips,Romantic stays|Ideas"), S("Packing guides|Tips,Travel safety|Tips,Hidden gems|Inspiration,Local food|Inspiration,Summer trips|Ideas,Eco-friendly stays|Tips")],
  "Airbnb-friendly apartments":[S("Austin|Apartments,Denver|Apartments,Nashville|Apartments,Atlanta|Apartments,Phoenix|Apartments,Dallas|Apartments,Houston|Apartments,Tampa|Apartments,Charlotte|Apartments,Seattle|Apartments,Chicago|Apartments"), S("Raleigh|Apartments,San Diego|Apartments,Orlando|Apartments,Columbus|Apartments,Boston|Apartments,Miami|Apartments")]
};
(function() {
  const tabs=document.querySelectorAll('.tab'), grid=document.querySelector('.destinations-grid'); if(!grid) return;
  let cur='Popular', open=false;
  const cell=([a, b])=>`<div class="destination"><a href="#">${a}</a><p>${b}</p></div>`;
  function render() {
    const [base, more]=INSP[cur];
    grid.innerHTML=base.map(cell).join('')+(open?more.map(cell).join(''):'')+
    `<div class="destination show-more-cell"><a href="#" id="showMore">${open?'Show less':'Show more'}</a></div>`;
    document.getElementById('showMore').onclick=e=> {
      e.preventDefault();open=!open;render()
    };
    grid.querySelectorAll('.destination:not(.show-more-cell) a').forEach(a=>a.onclick=e=>e.preventDefault());
  }
  tabs.forEach(t=>t.addEventListener('click', e=> {
    e.preventDefault(); cur=t.textContent.trim(); open=false;
    tabs.forEach(x=>x.classList.toggle('active', x===t)); render();
  }));
  render();
})();
(function() {
  const nav=document.querySelector('.nav-center'); if(!nav) return;
  const line=nav.querySelector('.underline'); if(!line) return;
  const current=line.closest('.nav-link');
  const reset=()=> {
    line.style.transition='none';line.style.transform='';line.style.width='';
  };
  addEventListener('pageshow', e=> {
    if(e.persisted)reset()
  });
  nav.querySelectorAll('.nav-link').forEach(link=> {
    link.addEventListener('click', e=> {
      if(link===current) {
        e.preventDefault();return
      }
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
      e.preventDefault();
      const from=current.getBoundingClientRect(), to=link.getBoundingClientRect();
      line.style.transition='transform .3s ease, width .3s ease';
      line.style.transform=`translateX(${to.left-from.left}px)`;
      line.style.width=to.width+'px';
      setTimeout(()=> {
        location.href=link.getAttribute('href')
      }, 300);
    });
  });
})();
