import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function Createproducts() {

    const [slug,setslug] = useState('')
    const [image,setimage] = useState('')
    const [title,settitle] = useState('')
    const [Company,setCompany] = useState('')
    const [price,setprice] = useState(0)
    const [images,setimages] = useState([])
    const [variants,setvariants] = useState([{color:'',storage:'',price:''}])
    const [Operating,setoperating] = useState('')
    const [Camera,setcamera] = useState('')
    const [Battery,setbattery] = useState('')
    const [Dimension,setdimension] = useState('')
    const [Weight,setweight] = useState('')
    const [Connectivity,setConnectivity] = useState('')
    const [Signal,setsignal] = useState('')
    const [ScreenSize,setscreensize] = useState('')
    const [Processor,setprocessor] = useState('')
    const [SimType,setsimtype] = useState('')
    const [MemoryCard,setmemorycard] = useState('')
    
    
    const handleImage = (e) => {
      const file = e.target.files[0]
      setFileToBase(file)
      console.log(file)
    }
    
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimage(reader.result)
      }
    
    }

    const handleAdd = () => {
      setvariants([...variants,{color:'',storage:'',price:''}])
    }
    

    const handlechange = (e,index) => {
      const {name,value} = e.target;
      const list=[...variants]
      list[index][name] = value;
      setvariants(list)
    }
    
    const deleteImage = (i) => {
      const deleteVal = [...variants]
      deleteVal.splice(i,1)
      setvariants(deleteVal)
    }
    
    const submitform = async (e) => {
      e.preventDefault();
    
      axios
      .post('/newproducts/add', {slug,Camera,Dimension,Signal,SimType,Processor,ScreenSize,Connectivity,MemoryCard,Weight,Battery,Operating,title,images,Company,image,variants,price})
      .then(() => {
        setslug('')
        settitle('')
        setCompany('')
        setprice(0)
        setimage('')        
        setimages([])
        setoperating('')
        setdimension('')
        setweight('')
        setbattery('')
        setsimtype('')
        setmemorycard('')
        setConnectivity('')
        setsignal('')
        setcamera('')
        setscreensize('')
        setprocessor('')
        setvariants([{color:'',storage:'',price:''}])
        toast.success('product added successfully')
        setTimeout(function() {
          window.location.reload();
        },3000)
      })
      .catch((err) => alert(err))
      
    }

    const listimages = (e) => {
        const files = Array.from(e.target.files)
        files.forEach(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            setimages(oldArray => [...oldArray, reader.result])
          }
        })
    }

    console.log(images)
 

  return (
    <div className="p-2 text-center">

    <h5>Slug</h5>
    <input type="text" value={slug} onChange={(e) => setslug(e.target.value)}/>

    <div className="m-1 d-flex flex-column align-items-center">

    <h5>Image</h5>
    <input  onChange={handleImage} type="file"/>

<h5>Variation Images</h5>
<input type="file" onChange={listimages} multiple/>

    <button className="px-3 py-1 border-0 bg-primary m-1 rounded-1" onClick={()=>handleAdd()}>Add</button>
{variants.map((x,i)=> (
  <>
  <input type="text" name="color" placeholder="color" onChange={e=> handlechange(e,i)}/>
  <input type="text" name="storage" placeholder="storage" onChange={e=> handlechange(e,i)}/>
  <input type="text" name="price" placeholder="price" onChange={e=> handlechange(e,i)}/>
  {variants.length!==1 &&
  <button onClick={()=> deleteImage(i)}>Remove</button>
  }
  </>
  )
  )  
}

    </div>

    <h5>Title</h5>
    <input type="text" value={title} onChange={(e) => settitle(e.target.value)}/>

    <h5>Company</h5>
    <input type="textarea" value={Company} onChange={(e) => setCompany(e.target.value)}/>

    <h5>Price</h5>
    <input type="text" value={price} onChange={(e) => setprice(e.target.value)}/>


    <h5>Operating</h5>
    <input type="text" value={Operating} onChange={(e) => setoperating(e.target.value)}/>

    <h5>Camera</h5>
    <input type="text" value={Camera} onChange={(e) => setcamera(e.target.value)}/>

    <h5>Battery</h5>
    <input type="text" value={Battery} onChange={(e) => setbattery(e.target.value)}/>

    <h5>Dimension</h5>
    <input type="text" value={Dimension} onChange={(e) => setdimension(e.target.value)}/>

    <h5>Weight</h5>
    <input type="text" value={Weight} onChange={(e) => setweight(e.target.value)}/>

    <h5>Connectivity</h5>
    <input type="text" value={Connectivity} onChange={(e) => setConnectivity(e.target.value)}/>

    <h5>Signal</h5>
    <input type="text" value={Signal} onChange={(e) => setsignal(e.target.value)}/>

    <h5>Screen Size</h5>
    <input type="text" value={ScreenSize} onChange={(e) => setscreensize(e.target.value)}/>
    
    <h5>Processor</h5>
    <input type="text" value={Processor} onChange={(e) => setprocessor(e.target.value)}/>
    
    <h5>SimType</h5>
    <input type="text" value={SimType} onChange={(e) => setsimtype(e.target.value)}/>
    
    <h5>Memory Card</h5>
    <input type="text" value={MemoryCard} onChange={(e) => setmemorycard(e.target.value)}/>


    <br></br>

    <button type="submit" onClick={submitform} className="px-2 py-1 m-2 bg-primary border-0 rounded-1">Create Upload</button>

</div>
  )
}
