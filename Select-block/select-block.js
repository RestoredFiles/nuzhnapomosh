
var groups=[
     {
       id: 1,
       name: 'Дети',
       groups:[
         {
           id: 2,
           name: 'Имеющие редкие заболевания',
           groups: [
             {
               id: 3,
               name: 'Spina Bifida',
               groups: [],
             },
             {
               id: 4,
               name: 'Буллёзный эпидермолиз',
               groups: [],
             },
           ],
         },
         {
           id: 5,
           name: 'С инвалидностью',
           groups: [],
         },
       ],
     },
     {
       id: 6,
       name: 'Профессиональные сообщества',
       groups: [],
     },
    {
           id: 7,
           name: 'Подростки',
           groups: [],
         },
        {
               id: 8,
               name: 'Женщины',
               groups: [],
             },
    
            
                {
                       id: 9,
                       name: 'Пожилые',
                       groups: [],
                     },
                    {
                           id: 10,
                           name: 'Семьи',
                           groups: [],
                         },
   ]
   k=0;
  ChosenCategories=[];
  f=0;
  selectBlock=document.querySelector('.select-block');
SubmitButton=document.querySelector(".select__submit");
function Tree(arr,t,name){
    List=document.querySelector(".select-popup");
    List.innerHTML+='<ul class="list select-list-'+t+' disabled"></ul>'
    if(t>0){
        document.querySelector('.select-list-'+t).innerHTML +='<li class="select-category"><button class="menu__button   backward__button white-hover" data="'+t+'"><div class="back__arrow"><</div>'+name+'</button></li>'
    }
    if(t==1){
        document.querySelector('.select-list-'+t).innerHTML +='<li class="select-category"><button class="menu__button  select__button select__button_all white-hover" level='+t+' ref='+name+'>Все '+name+'</button></li>';
    }
   
    for(var i = 0; i < arr.length; i++)
   {
    if(arr[i].groups.length==0){
        document.querySelector('.select-list-'+t).innerHTML +='<li class="select-category"><button class="menu__button  select__button white-hover last" req="'+t+'" id="'+arr[i].id+'">' + arr[i].name + '</button></li>';
    }
    else
    document.querySelector('.select-list-'+t).innerHTML +='<li class="select-category"><button class="menu__button  select__button white-hover" id="'+arr[i].id+'">' + arr[i].name + '</button></li>';
    
    if(arr[i].groups.length>0){
        name=arr[i].name;               
        document.getElementById(arr[i].id).innerHTML+='<div class="select__arrow">></div>';
        document.getElementById(arr[i].id).setAttribute("data",t+1);
        
        Tree(arr[i].groups,t+1,name) ;
 
    }
}
}
ans=[];
function Search(arr,id){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].id==id){

            ans[0]=arr[i].name;
            if(arr[i].groups.length>0)
            ans[1]=false;
            else ans[1]=true;
        }
        if(arr[i].groups.length>0)
        Search(arr[i].groups,id);
    }
    return ans;
}

function Collectioner(arr,ans){
    for(var i = 0; i < arr.length; i++){
        ans.push(arr[i].id);
        if(arr[i].groups.length>0){
           Collectioner(arr[i].groups,ans);}
    }
    return ans
}
function Collect(arr,name){
    ans=[];
    for(var i = 0; i < arr.length; i++){
        if (name==arr[i].name){
       Collectioner(arr[i].groups,ans);
       
        }
    return ans;
}
}

 Tree(groups,0,'');


 k=0;
 n=0;
 function lineCollab(id){
        Line=document.querySelector('[pos="'+n+'"]');

        if(Search(groups,id)[1]){
            
        Line.innerHTML+='<div class="selected-category subtext" data="'+n+'" value='+id+' name="'+Search(groups,id)[0]+'">'+Search(groups,id)[0]+'</div><button class="delete-button select-delete-button white-hover" data='+n+'>✖</button>';
        n++;
        
        }
        else{
            Line.innerHTML+='<div class="selected-category subtext" data="'+n+'" value='+id+' name="'+Search(groups,id)[0]+'">'+Search(groups,id)[0]+'</div><div class="selected-line__icon">→</div>';
        }
        selectCategory=document.querySelectorAll(".selected-category");
        deleteButtons=document.querySelectorAll(".delete-button");
deleteButtons.forEach((element)=>{
    element.addEventListener("click",function(){

  
    deleted=document.querySelector('[pos="'+element.getAttribute("data")+'"]');
    deleted.remove();
    ChosenCategories=[];

});
})
    }

selectButtons=document.querySelectorAll('.select__button');
 selectButtons.forEach((element)=>{
    element.addEventListener("click",function(){
    if(!element.hasAttribute("ref"))
     lineCollab(element.getAttribute("id"));
    })
 })
  
 
nodeBranches= document.querySelectorAll("button[data]");
nodeBranches.forEach((element)=>{
 element.addEventListener("click",function(){
    level=element.getAttribute("data");
    document.querySelector('.select-list-'+level).classList.toggle("disabled");
    document.querySelector('.select-list-'+(level-1)).classList.toggle("disabled");
});
})

allGroupsButton=document.querySelectorAll(".select__button_all");
allGroupsButton.forEach((element)=>{
    element.addEventListener("click",function(){
       document.querySelector('.select-list-'+element.getAttribute("level")).classList.toggle("disabled");
       
       Line=document.querySelector('[pos="'+n+'"]');
       Line.innerHTML+='<div class="selected-category subtext" ref="'+element.getAttribute("ref")+'" data="'+n+'">Все '+element.getAttribute("ref")+'</div><button class="delete-button_all delete-button select-delete-button white-hover" data="'+n+'">✖</button>';
       n++;
       deletAll=document.querySelectorAll(".delete-button_all");
       deletAll.forEach((elem)=>{
           elem.addEventListener("click",function(){
               deleted=document.querySelector('[pos="'+elem.getAttribute("data")+'"]');
           deleted.remove();
           ChosenCategories=[];
   
           })
       })
    })
   
});
wrap=document.querySelector(".button__wrapper");
chooseButton=document.querySelector(".choose__button");
chooseButton.addEventListener("click",function(){
    document.querySelector('.select-popup').classList.remove("disabled");
    document.querySelector('.select-list-0').classList.remove("disabled");
    document.querySelector('.button__label').textContent="Выбрать ещё";
    Line=document.createElement("div");
        Line.setAttribute("pos",n);
        selectBlock.insertBefore(Line,wrap);
        Line.classList.add("selected-line");


});

backwardButtons=document.querySelectorAll(".backward__button");
backwardButtons.forEach((element)=>{
    element.addEventListener("click",function(){
        level=element.getAttribute("data");
        document.querySelector('.select-list-'+level).classList.add("disabled");
        document.querySelector('.select-list-'+(level-1)).classList.remove("disabled");
       deleted=$(".selected-category:last");
       deleted.remove();
        deleted=$(".selected-line__icon:last");
        deleted.remove();
    })
})
SubmitButton.addEventListener("click",function(){
    document.querySelectorAll(".selected-category").forEach((element)=>{
        if(element.getAttribute("value"))
        ChosenCategories.push(+(element.getAttribute("value")));
        if(element.getAttribute("ref"))
        ChosenCategories=ChosenCategories.concat(Collect(groups,element.getAttribute("ref")));
    });
    console.log('groups:'+ChosenCategories);
});
lastCat=document.querySelectorAll(".last")
lastCat.forEach((element)=>{
    element.addEventListener("click",function(){
    document.querySelector('.select-list-'+element.getAttribute("req")).classList.add("disabled");
    })
})