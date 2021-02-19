const thumbnails = document.getElementById('thumbnails');
const featured = document.getElementById('featured');
const expectButton=document.getElementById('add');
const expectInput=document.getElementById('expect');
const description=document.getElementById('description');
const hideButton=document.getElementById('hide')
const expectList=document.getElementsByClassName('expect')
expectButton.addEventListener('click',()=>{
  // console.log(expectInput.value)
  let newExp=document.createElement('li')
  let removeButton=document.createElement('button')
  newExp.textContent=expectInput.value+" "
  expectInput.value=''
  newExp.setAttribute('class','expect')
  removeButton.textContent='(Del)'
  newExp.append(removeButton)
  description.append(newExp)
  removeButton.addEventListener('click',()=>{
    newExp.remove()
  })

})

hideButton.addEventListener('click',()=>{
  for (let i=0;i<expectList.length;i++){
    let expectItem=expectList[i];
    if (expectItem.style.display=='none'){expectItem.setAttribute('style','display:block');
          hideButton.textContent='Hide'}    
    else{expectItem.setAttribute('style',"display:None");
          hideButton.textContent='Display'}  }
})


for (let i=0; i<images.length; i++){
  const currImage = images[i];
  const image = document.createElement('img');
  image.setAttribute('src',currImage.url);
  image.setAttribute('alt',currImage.alt);

  thumbnails.append(image);

featureImage=function (){
  featured.setAttribute('src', image.src);
  featured.setAttribute('alt', image.alt);
  const currentDescription = document.getElementById('current_description');
  currentDescription.textContent = currImage.description
}
image.addEventListener('mouseover',featureImage)
if (i===0){featureImage();}

}


// const img = document.getElementsByClassName('thumbnails')
// const imgs=document.getElementsByClassName('thumbnails')
// for(let i=0; i<imgs.length; i++){
//   imgs[i].addEventListener('click',()=>{
//     featured.setAttribute('src', imgs[i].src);
//     featured.setAttribute('alt', imgs[i].alt);
//   })
// }