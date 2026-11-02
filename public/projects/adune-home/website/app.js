



/* ADUNÉ Brand Concept — self-contained React edition, no npm installation required. */
(function () {
'use strict';
const h = React.createElement;
const A='/assets/original/';
// Generated locally by npm run sync:assets. Original files stay on your machine.
// Empty paths intentionally show a neutral editorial placeholder — never stock photos.
const MEDIA=window.ADUNE_ORIGINAL_MEDIA||{};
const media=(file)=>MEDIA[file]?('../public/assets/original/'+MEDIA[file]):'';
const photoStyle=(file)=>({backgroundImage:media(file)?`url("${media(file)}")`:undefined});
if(media('hero.jpg'))document.documentElement.style.setProperty('--adune-hero-image',`url("${media('hero.jpg')}")`);
if(media('story.jpg'))document.documentElement.style.setProperty('--adune-story-image',`url("${media('story.jpg')}")`);
const shopURL='https://adunehome.com/shop/';
const PRODUCTS=[
 {id:'heart',name:'The Heart Tray',category:'Decor',price:'See current price',photo:'heart-tray.jpg',sub:'Part of the Aduné MINIS collection.',url:'https://adunehome.com/product/minis-collection-the-heart-tray/',edition:''},
 {id:'ritual',name:'The Ritual Tray',category:'Decor',price:'See current price',photo:'ritual-tray.jpg',sub:'Everyday objects, made with intention.',url:'https://adunehome.com/shop/',edition:''},
 {id:'palm',name:'Aduné Palm Chair',category:'Living',price:'See current price',photo:'palm-chair.jpg',sub:'A distinctive woven lounge chair.',url:'https://adunehome.com/product/adune-palm-chair/',edition:''},
 {id:'fringe',name:'The Fringe Placemat',category:'Dining',price:'See current price',photo:'fringe-placemat.jpg',sub:'Texture for the everyday table.',url:'https://adunehome.com/shop/',edition:''},
 {id:'haven',name:'Haven Tissue Storage Box',category:'Living',price:'See current price',photo:'haven-tissue-box.jpg',sub:'A thoughtful place for the practical.',url:'https://adunehome.com/shop/',edition:''},
 {id:'desk',name:'Aduné Lap Desk',category:'Personal',price:'See current price',photo:'lap-desk.jpg',sub:'Space for slow and thoughtful work.',url:'https://adunehome.com/shop/',edition:''},
 {id:'coasters',name:'Aduné Coaster Set',category:'Dining',price:'See current price',photo:'coasters.jpg',sub:'Small objects, everyday rituals.',url:'https://adunehome.com/shop/',edition:''},
 {id:'base',name:'Aduné Base Set',category:'Dining',price:'See current price',photo:'base-set.jpg',sub:'A handwoven tray and placemat pairing.',url:'https://adunehome.com/product/adune-base-set/',edition:''}
];
const ROOMS=[
 {name:'Living',title:'Made for living',image:'living.jpg',index:''},
 {name:'Dining',title:'Gather beautifully',image:'dining.jpg',index:''},
 {name:'Decor',title:'Objects with meaning',image:'decor.jpg',index:''}
];
function Icon(props){ const n=props.name; let children=[];const common={fill:'none',stroke:'currentColor',strokeWidth:1.6,strokeLinecap:'round',strokeLinejoin:'round'};
 if(n==='arrow')children=[h('path',{d:'M3 12h16m-6-6 6 6-6 6',key:1})];
 else if(n==='bag')children=[h('path',{d:'M5 8h14l1 12H4L5 8Z',key:1}),h('path',{d:'M9 9V6a3 3 0 0 1 6 0v3',key:2})];
 else if(n==='menu')children=[h('path',{d:'M3 8h18M3 16h18',key:1})];
 else if(n==='close')children=[h('path',{d:'M5 5l14 14M19 5 5 19',key:1})];
 else if(n==='plus')children=[h('path',{d:'M12 4v16M4 12h16',key:1})];
 else if(n==='minus')children=[h('path',{d:'M4 12h16',key:1})];
 else if(n==='search')children=[h('circle',{cx:10.8,cy:10.8,r:6.8,key:1}),h('path',{d:'m16 16 5 5',key:2})];
 else if(n==='instagram')children=[h('rect',{x:3,y:3,width:18,height:18,rx:5,key:1}),h('circle',{cx:12,cy:12,r:4,key:2}),h('circle',{cx:17.4,cy:6.6,r:1,fill:'currentColor',stroke:'none',key:3})];
 else if(n==='chevron')children=[h('path',{d:'m7 10 5 5 5-5',key:1})];
 return h('svg',{viewBox:'0 0 24 24',width:props.size||21,height:props.size||21,role:'presentation','aria-hidden':true,...common},...children);
}
function Mark({small=false}) {return MEDIA['brand-symbol']?h('img',{className:'original-symbol',src:media('brand-symbol'),alt:'ADUNÉ original brand symbol'}):h('span',{className:'typographic-mark'},'ADUNÉ');}
function Wordmark({light=false}){return MEDIA['brand-logo']?h('img',{className:'official-wordmark'+(light?' original-light':''),src:media('brand-logo'),alt:'ADUNÉ Home original logo'}):h('span',{className:'wordmark'+(light?' wordmark-light':'')},'ADUNÉ');}
function ButtonLink({href,children,light=false,onClick}){return h('a',{className:'button-link'+(light?' button-link-light':''),href,onClick},h('span',null,children),h(Icon,{name:'arrow',size:18}));}
function Reveal({children,className='',style={}}){return h('div',{className:'reveal '+className,style},children);}
function Header({onMenu,onBag,count,route,navigate}){
 return h('div',{className:'header-frame'},
 h('div',{className:'announcement'},'COMPLIMENTARY DISCOVERY · HANDCRAFTED IN SPIRIT, ROOTED IN CULTURE',h('span',{className:'announce-mark'},'✳')),
 h('header',{className:'site-header'},
  h('div',{className:'header-side header-left'},h('button',{className:'icon-button menu-trigger','aria-label':'Open navigation',onClick:onMenu},h(Icon,{name:'menu'})),h('span',{className:'header-small'},'THE ART OF HOME')),
  h('a',{href:'#home',className:'brand-lockup',onClick:(e)=>{e.preventDefault();navigate('home')}},h(Wordmark),h('span',{className:'brand-under'},'HOME OBJECTS')),
  h('div',{className:'header-side header-right'},h('a',{href:'#shop',className:'header-shop-link',onClick:e=>{e.preventDefault();navigate('shop')}},'EXPLORE THE EDIT'),h('button',{className:'icon-button bag-button',onClick:onBag,'aria-label':'Open saved pieces'},h(Icon,{name:'bag'}),h('span',{className:'bag-count'},count)))));
}
function Menu({open,onClose,navigate}){let items=[['home','Home'],['shop','The Collection'],['story','Our Story'],['journal','The Journal']];return h('div',{className:'nav-overlay'+(open?' nav-open':'')},
 h('div',{className:'nav-top'},h(Wordmark),h('button',{className:'icon-button',onClick:onClose,'aria-label':'Close menu'},h(Icon,{name:'close',size:27}))),
 h('div',{className:'nav-content'},h('div',{className:'eyebrow'},'A PLACE TO FEEL AT HOME'),h('nav',null,...items.map(([id,label],i)=>h('a',{key:id,href:'#'+id,onClick:e=>{e.preventDefault();onClose();navigate(id)}},h('span',{className:'nav-number'},String(i+1).padStart(2,'0')),label,h('span',{className:'nav-arrow'},'↗'))))),
 h('div',{className:'nav-bottom'},h('span',null,'ABUJA, NIGERIA'),h('span',null,'OBJECTS OF BELONGING · EST. 2025')));
}
function Hero({navigate}) {return h('section',{className:'hero',id:'hero'},
 h('div',{className:'hero-photograph'}),h('div',{className:'hero-shade'}),
 h('div',{className:'hero-inner'},
 h('div',{className:'hero-kicker'},h('span',{className:'tiny-line'}),'THE ADUNÉ HOME COLLECTION · 2026'),
 h('div',{className:'hero-content'},h('div',{className:'hero-heading-wrap'},h('p',{className:'hero-preline'},''),h('h1',null,'Objects of',h('br'),h('em',null,'belonging.')),
  h('div',{className:'hero-lower'},h('p',null,'Quietly expressive home pieces, thoughtfully made to give everyday living a little more meaning.'),h('a',{href:'#shop',className:'round-cta',onClick:e=>{e.preventDefault();navigate('shop')},'aria-label':'Explore the collection'},h(Icon,{name:'arrow',size:30}))))),
 h('div',{className:'hero-aside'},h('span',null,'FORM / FEELING / HERITAGE'),h('span',{className:'hero-issue'},'01 — 06'))),
 h('div',{className:'hero-footer'},h('div',null,h('span',{className:'scroll-line'}),'SCROLL TO DISCOVER'),h('span',null,'CONSIDERED LIVING, BEAUTIFULLY DONE')));}
function Statement(){return h('section',{className:'statement section-shell',id:'philosophy'},
 h(Reveal,{className:'statement-top'},h('span',{className:'eyebrow'},'01 / OUR POINT OF VIEW'),h('span',{className:'eyebrow'},'CRAFTED TO FEEL LIKE HOME')),
 h(Reveal,{className:'statement-body'},h('h2',null,'Not simply things to own.',h('br'),h('em',null,'Things to live with.')),
 h('div',{className:'statement-bottom'},h(Mark),h('p',null,'A home is the sum of its small, beautiful moments. We bring together thoughtful forms, natural textures and the spirit of handcraft to make space for all of yours.'))),
 h('div',{className:'statement-rule'}));}
function SectionHead({num,label,title,linkLabel,linkHref,onLink}){return h('div',{className:'section-head'},
 h('div',{className:'section-meta'},h('span',{className:'eyebrow'},num+' / '+label),linkLabel&&h('a',{href:linkHref||'#shop',className:'text-link',onClick:onLink},linkLabel,h('span',null,'↗'))),
 h('h2',null,title));}
function ProductCard({item,onOpen,index}){return h('article',{className:'product-card'},
 h('button',{className:'product-photo',onClick:()=>onOpen(item),style:photoStyle(item.photo),'aria-label':'See '+item.name},
 h('span',{className:'product-photo-label'},item.edition),h('span',{className:'product-add'},h(Icon,{name:'plus',size:19}))),
 h('div',{className:'product-info'},h('div',null,h('h3',null,item.name),h('span',{className:'product-category'},item.category+' / The Aduné Edit')),h('div',{className:'product-price'},item.price)));
}
function Featured({navigate,onOpen}){return h('section',{className:'featured section-shell',id:'featured'},
 h(SectionHead,{num:'02',label:'SELECTED PIECES',title:'A collection of quiet character.',linkLabel:'VIEW THE FULL COLLECTION',onLink:e=>{e.preventDefault();navigate('shop')}}),
 h('div',{className:'featured-grid'},...PRODUCTS.slice(0,3).map((p,i)=>h(Reveal,{key:p.id,className:'featured-item',style:{transitionDelay:(i*120)+'ms'}},h(ProductCard,{item:p,onOpen,index:i})))),
 h('p',{className:'photo-disclaimer'},'PRODUCT PHOTOS SOURCE: ADUNEHOME.COM · ORIGINAL IMAGES DOWNLOADED BY THE SYNC SCRIPT.'));
}
function CraftBand(){return h('section',{className:'craft-band'},h('div',{className:'craft-band-ticker'},...Array.from({length:4},(_,i)=>h('span',{key:i},'NOT JUST DECOR',h('i',null,'✳'),'A SENSE OF PLACE',h('i',null,'✳')))));}
function Collections({navigate}){return h('section',{className:'collections section-shell',id:'collections'},
 h(SectionHead,{num:'03',label:'EXPLORE BY SPACE',title:'Find your kind of home.'}),
 h('div',{className:'rooms-grid'},...ROOMS.map((room,i)=>h(Reveal,{key:room.name,className:'room-reveal'},h('a',{href:'#shop',className:'room-card',onClick:e=>{e.preventDefault();navigate('shop',room.name)}},h('div',{className:'room-image',style:photoStyle(room.image)}),h('span',{className:'room-index'},room.index+' / 03'),h('div',{className:'room-copy'},h('span',null,room.title),h('strong',null,room.name),h('span',{className:'room-circle'},'↗')))))));
}
function AboutBlock({navigate}){return h('section',{className:'about-block',id:'craft'},
 h('div',{className:'about-photo'},h('div',{className:'about-image',style:{backgroundImage:media('craft.jpg')?`url("${media('craft.jpg')}")`:undefined}}),h('div',{className:'image-caption'},'TEXTURE IS ITS OWN LANGUAGE · STUDY 01')),
 h('div',{className:'about-copy'},h('div',{className:'eyebrow'},'04 / MADE WITH MEANING'),h('h2',null,'A little less',h('br'),'ordinary.',h('br'),h('em',null,'A lot more soul.')),
 h('p',null,'We believe the best things in a room aren’t always the loudest. They’re the pieces that invite a second look, a slower morning, a familiar feeling.'),
 h('div',{className:'craft-details'},h('div',null,h('span',null,'01'),h('strong',null,'Honest materials')),h('div',null,h('span',null,'02'),h('strong',null,'Thoughtful forms')),h('div',null,h('span',null,'03'),h('strong',null,'Everyday warmth'))),
 h(ButtonLink,{href:'#story',onClick:e=>{e.preventDefault();navigate('story')}},'THE STORY BEHIND ADUNÉ')));
}
function Immersive(){return h('section',{className:'immersive'},
 h('div',{className:'immersive-image'}),h('div',{className:'immersive-shade'}),
 h('div',{className:'immersive-top'},h('span',null,'A MOMENT AT HOME'),h('span',null,'STUDY NO. 02')),
 h('div',{className:'immersive-content'},h('div',{className:'starburst'},'✳'),h('h2',null,'Beauty belongs in',h('br'),h('em',null,'the everyday.')),h('p',null,'More than decoration, these are the details that turn a space into somewhere unmistakably yours.')),
 h('div',{className:'immersive-bottom'},h('span',null,'ADUNÉ HOME'),h('span',null,'MADE FOR YOUR MOMENTS')));
}
function Journal({navigate}){return h('section',{className:'journal section-shell'},
 h(SectionHead,{num:'05',label:'THE JOURNAL',title:'Notes from a slower home.',linkLabel:'DISCOVER THE JOURNAL',onLink:e=>{e.preventDefault();navigate('journal')}}),
 h('div',{className:'journal-grid'},h('a',{href:'#journal',className:'journal-main',onClick:e=>{e.preventDefault();navigate('journal')}},h('div',{className:'journal-image',style:{backgroundImage:media('art.jpg')?`url("${media('art.jpg')}")`:undefined}}),h('span',{className:'eyebrow'},'FIELD NOTES · 01'),h('h3',null,'The art of living with less,',h('br'),h('em',null,'and feeling more.')),h('span',{className:'text-link'},'READ THE STORY ↗')),
 h('div',{className:'journal-aside'},h('div',{className:'journal-aside-image',style:{backgroundImage:media('materials.jpg')?`url("${media('materials.jpg')}")`:undefined}}),h('p',{className:'eyebrow'},'OBJECT STUDY · 02'),h('h3',null,'On the beauty of texture.'),h('p',null,'Sometimes, the simplest surface holds the richest story.'))));}
class Newsletter extends React.Component {
 constructor(props){super(props);this.state={email:'',submitted:false,error:''}}
 render(){const {email,submitted,error}=this.state;
 return h('section',{className:'newsletter'},h('div',{className:'newsletter-left'},h('span',{className:'eyebrow'},'A NOTE FROM ADUNÉ'),h('h2',null,'Let’s make room',h('br'),h('em',null,'for beautiful things.'))),
 h('div',{className:'newsletter-right'},h('p',null,'New objects, thoughtful ideas and a little inspiration for the spaces we love.'),submitted?h('p',{className:'form-notice'},'Thank you. This is a design preview; no email has been submitted.'):h('form',{onSubmit:e=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){this.setState({error:'Enter a valid email address.'});return}this.setState({error:'',submitted:true})}},h('label',{htmlFor:'signup'},'EMAIL ADDRESS'),h('div',{className:'signup-field'},h('input',{id:'signup',type:'email',value:email,placeholder:'Your email address',onChange:e=>this.setState({email:e.target.value}),required:true}),h('button',{type:'submit','aria-label':'Join preview newsletter'},h(Icon,{name:'arrow'}))),error&&h('span',{className:'form-error'},error),h('small',null,'CONCEPT FORM ONLY — NO SUBSCRIPTION BACKEND CONNECTED.'))));
 }
}
function Footer({navigate}){return h('footer',{className:'footer'},h('div',{className:'footer-top'},h('div',null,h('span',{className:'eyebrow'},'COLLECT WELL. LIVE WELL.'),h('h2',null,'There’s no place',h('br'),h('em',null,'like yours.'))),h('div',{className:'footer-links'},h('div',null,h('span',null,'DISCOVER'),...[['shop','The collection'],['story','Our story'],['journal','Journal']].map(([r,t])=>h('a',{key:r,href:'#'+r,onClick:e=>{e.preventDefault();navigate(r)}},t))),h('div',null,h('span',null,'FIND US'),h('a',{href:'https://adunehome.com/',target:'_blank',rel:'noopener noreferrer'},'Official Aduné Website ↗'),h('a',{href:'https://adunehome.com/shop/',target:'_blank',rel:'noopener noreferrer'},'Original Shop ↗'),h('span',{className:'footer-location'},'Abuja · Nigeria')))),
 h('div',{className:'footer-wordmark'},h(Wordmark)),h('div',{className:'footer-bottom'},h('span',null,'© 2026 ADUNÉ HOME · UNOFFICIAL REBRAND CONCEPT'),h('span',null,'OBJECTS OF BELONGING'),h('a',{href:'#home',onClick:e=>{e.preventDefault();navigate('home')}},'BACK TO TOP ↑')));
}
function Cart({open,onClose,cart,onRemove,onOpen}){return h('div',{className:'drawer-backdrop'+(open?' is-open':'')},h('button',{className:'backdrop-close','aria-label':'Close saved pieces',onClick:onClose}),h('aside',{className:'drawer',role:'dialog','aria-modal':true,'aria-label':'Saved pieces'},h('div',{className:'drawer-heading'},h('div',null,h('span',{className:'eyebrow'},'CURATED BY YOU'),h('h2',null,'Saved pieces',h('sup',null,cart.length))),h('button',{className:'icon-button',onClick:onClose,'aria-label':'Close'},h(Icon,{name:'close'}))),cart.length?h('div',{className:'drawer-items'},...cart.map((item,i)=>h('div',{key:item.id+'-'+i,className:'drawer-item'},h('img',{src:media(item.photo)||'../public/assets/original/placeholder.svg',alt:''}),h('div',null,h('h3',null,item.name),h('p',null,item.price),h('button',{onClick:()=>onRemove(item.id)},'REMOVE'))))):h('div',{className:'empty-cart'},h(Mark),h('h3',null,'A little space for something lovely.'),h('p',null,'Save the pieces that speak to you, then visit the official shop to purchase.'),h('button',{className:'dark-btn',onClick:onClose},'CONTINUE EXPLORING')),h('div',{className:'drawer-footer'},h('p',null,'This is a concept wishlist — not an operational shopping cart.'),h('a',{href:shopURL,target:'_blank',rel:'noopener noreferrer',className:'dark-btn'},'VISIT OFFICIAL STORE ↗'))));}
class ProductModal extends React.Component {
 componentDidMount(){document.addEventListener('keydown',this.onKey)}
 componentWillUnmount(){document.removeEventListener('keydown',this.onKey)}
 onKey=(e)=>{if(e.key==='Escape' && this.props.item)this.props.onClose()};
 render(){const {item,onClose,onSave,saved}=this.props;if(!item)return null;
 return h('div',{className:'product-modal-wrap'},h('button',{className:'modal-backdrop','aria-label':'Close product details',onClick:onClose}),h('section',{className:'product-modal',role:'dialog','aria-modal':true,'aria-label':item.name},h('button',{className:'modal-close',onClick:onClose,'aria-label':'Close'},h(Icon,{name:'close'})),h('div',{className:'modal-photo',style:photoStyle(item.photo)}),h('div',{className:'modal-copy'},h('span',{className:'eyebrow'},'THE ADUNÉ EDIT · '+item.edition),h('h2',null,item.name),h('p',{className:'modal-price'},item.price),h('p',null,item.sub+' Thoughtfully chosen to bring richness, warmth and everyday beauty into your space.'),h('div',{className:'modal-note'},'CONCEPT PRODUCT VIEW · ORIGINAL PHOTOGRAPH WHEN AVAILABLE'),h('button',{className:'dark-btn',onClick:()=>onSave(item)},saved?'SAVED TO YOUR EDIT ✓':'SAVE THIS PIECE +'),h('a',{href:item.url,target:'_blank',rel:'noopener noreferrer',className:'text-link'},'SEE ON OFFICIAL ADUNÉ STORE ↗'))));
 }
}
function ShopPage({navigate,onOpen,filter,setFilter}){let filters=['All','Living','Dining','Decor','Personal'];let items=filter==='All'?PRODUCTS:PRODUCTS.filter(p=>p.category===filter);return h('main',{className:'internal-page shop-page'},
 h('div',{className:'interior-hero'},h('span',{className:'eyebrow'},'THE ADUNÉ HOME COLLECTION'),h('h1',null,'Pieces with',h('br'),h('em',null,'a point of view.')),h('p',null,'For the moments you make, and the memories you keep.'),h(Mark)),
 h('section',{className:'shop-list section-shell'},h('div',{className:'shop-filter-bar'},h('span',{className:'eyebrow'},'CURATED OBJECTS / 2026'),h('div',{className:'shop-filters'},...filters.map(f=>h('button',{key:f,className:filter===f?'selected':'',onClick:()=>setFilter(f)},f))),h('span',{className:'shop-count'},String(items.length).padStart(2,'0')+' OBJECTS')),
 h('div',{className:'shop-products'},...items.map(p=>h(ProductCard,{key:p.id,item:p,onOpen}))),h('p',{className:'shop-disclaimer'},'Original product names from adunehome.com. Confirm current prices, product photographs and purchase terms on the official site.')));
}
function StoryPage({navigate}){return h('main',{className:'internal-page story-page'},
 h('section',{className:'story-intro section-shell'},h('span',{className:'eyebrow'},'OUR STORY · 01'),h('h1',null,'A home should',h('br'),h('em',null,'feel like you.')),h('p',null,'Not a catalogue. Not a showroom. A place with a pulse; filled with the forms, memories and small details that make it yours.')),
 h('section',{className:'story-image-block'},h('div',{className:'story-image'}),h('span',null,'AN EXPLORATION OF FORM, TEXTURE AND BELONGING')),
 h('section',{className:'story-columns section-shell'},h('span',{className:'eyebrow'},'BEAUTY IS PERSONAL'),h('div',null,h('h2',null,'Rooted in culture.',h('br'),h('em',null,'Made for living.')),h('p',null,'ADUNÉ began with a belief in the beauty of handcraft: traditional ways of making interpreted with a modern sensibility. The original brand celebrates skilled hands, considered design and objects that bring meaning to daily life. This proposed identity gives that belief a quieter, more distinctive voice.'),h('p',null,'Natural texture and sculptural silhouettes become a visual language for homes that feel collected, never simply decorated.'),h(ButtonLink,{href:'#shop',onClick:e=>{e.preventDefault();navigate('shop')}},'DISCOVER THE COLLECTION'))),
 h('section',{className:'story-pillars section-shell'},...[['01','Elegance','A sense of beauty that never needs to shout.'],['02','Craftsmanship','Attention to the hands and ideas behind each object.'],['03','Thoughtfulness','Made to be kept, used and cherished.']].map(([n,t,b])=>h('div',{key:n},h('span',null,n),h('h3',null,t),h('p',null,b)))));
}
function JournalPage(){return h('main',{className:'internal-page journal-page'},h('div',{className:'interior-hero'},h('span',{className:'eyebrow'},'IDEAS / OBSERVATIONS / OBJECTS'),h('h1',null,'The art of',h('br'),h('em',null,'being home.')),h('p',null,'An editorial space for thoughtful living.')),h('div',{className:'journal-article section-shell'},h('img',{src:media('art.jpg')||'../public/assets/original/placeholder.svg',alt:'Vase with leafy branches in warm room'}),h('div',null,h('span',{className:'eyebrow'},'FIELD NOTES / 01'),h('h2',null,'A little less. A lot more feeling.'),h('p',null,'The most meaningful spaces aren’t defined by how much fills them, but by how each piece makes us feel. A beautiful object is not just something to look at: it becomes part of the rituals, memories and conversations of everyday life.'),h('p',null,'Start with what matters. Make room for texture. Notice the light. Let the pieces you choose tell a story that only you can tell.'))));}
function readRoute(){const r=location.hash.replace('#','').split('/')[0];return ['shop','story','journal'].includes(r)?r:'home'}
class App extends React.Component {
 constructor(props){super(props);this.state={route:readRoute(),filter:'All',menu:false,drawer:false,selected:null,cart:[]};this.observer=null}
 componentDidMount(){window.addEventListener('hashchange',this.onHash);this.observe()}
 componentDidUpdate(prevProps,prevState){if(prevState.route!==this.state.route||prevState.filter!==this.state.filter)this.observe();document.body.classList.toggle('overlay-lock',this.state.menu||this.state.drawer||!!this.state.selected)}
 componentWillUnmount(){window.removeEventListener('hashchange',this.onHash);if(this.observer)this.observer.disconnect();document.body.classList.remove('overlay-lock')}
 onHash=()=>{this.setState({route:readRoute()});window.scrollTo(0,0)};
 observe=()=>{if(this.observer)this.observer.disconnect();const nodes=document.querySelectorAll('.reveal');if(typeof IntersectionObserver==='undefined'){nodes.forEach(n=>n.classList.add('is-visible'));return}this.observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');this.observer.unobserve(e.target)}}),{threshold:.08});nodes.forEach(n=>this.observer.observe(n))};
 navigate=(r,cat)=>{if(cat)this.setState({route:r,filter:cat});else this.setState({route:r,filter:r==='shop'?'All':this.state.filter});window.location.hash=r;window.scrollTo(0,0)};
 save=(item)=>{this.setState(prev=>({cart:prev.cart.find(p=>p.id===item.id)?prev.cart:[...prev.cart,item]}))};
 render(){const {route,filter,menu,drawer,selected,cart}=this.state;const navigate=this.navigate;
 return h('div',{className:'app-root'},h(Header,{onMenu:()=>this.setState({menu:true}),onBag:()=>this.setState({drawer:true}),count:cart.length,route,navigate}),
 route==='home'?h('main',null,h(Hero,{navigate}),h(Statement),h(Featured,{navigate,onOpen:(p)=>this.setState({selected:p})}),h(CraftBand),h(Collections,{navigate}),h(AboutBlock,{navigate}),h(Immersive),h(Journal,{navigate}),h(Newsletter)):route==='shop'?h(ShopPage,{navigate,onOpen:(p)=>this.setState({selected:p}),filter,setFilter:(f)=>this.setState({filter:f})}):route==='story'?h(StoryPage,{navigate}):h(JournalPage),
 h(Footer,{navigate}),h(Menu,{open:menu,onClose:()=>this.setState({menu:false}),navigate}),h(Cart,{open:drawer,onClose:()=>this.setState({drawer:false}),cart,onRemove:id=>this.setState(prev=>({cart:prev.cart.filter(p=>p.id!==id)})),onOpen:(p)=>this.setState({selected:p})}),h(ProductModal,{item:selected,onClose:()=>this.setState({selected:null}),onSave:this.save,saved:!!selected&&cart.some(x=>x.id===selected.id)}));
 }
}
ReactDOM.render(h(App),document.getElementById('root'));
})();
