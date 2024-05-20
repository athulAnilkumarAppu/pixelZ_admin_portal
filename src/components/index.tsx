import { useEffect, useState } from "react"

import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios'
import ResultGrid from "./ResultGrid"
import { BASE_URl } from "./libs/config";
import { RadioButton } from "@progress/kendo-react-inputs";



const AdminPortalIndex = ()=> {


  const [file, setFile] = useState<any>('')

  const [imageBase64, setImageBase64] = useState<any>('')
  const [selectedCategory, setSelectedCategory] = useState<any>('')
  const [imageThumbnail, setImageThumbnail] = useState<any>('')

  const [allWallpapersData, setAllWallpapersData] = useState<any>([])
  const [imageAddType, setImageAddType] = useState<any>('imageUrl')

  const [imageUrl, setImageUrl] = useState<string>('')



    const [gridLoading, setGridLoading] = useState<boolean>(false)


    const getAllResultService = async ()=> {
        setGridLoading(true)
        await  axios.post(BASE_URl+'getAllWallpapersAdminApi', {}).then((response: any)=> {
            if(response){
              setAllWallpapersData(response?.data?.fullResult ? response.data.fullResult : [])
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        }).finally(()=> {
            setGridLoading(false)
        })
    }

    useEffect(()=> {
        getAllResultService()
    },[])



    // const onFileChange = (event: any) => {
    //   const file: any = event.target.files[0];
    //   setFile(file)
    //   const reader: any = new FileReader();
  
    //   reader.onload = () => {
    //     const base64String = reader.result.split(',')[1];
    //     setImageBase64(`data:image/jpeg;base64,${base64String}`);
    //   };
  
    //   reader.readAsDataURL(file);
    // };

    const onCategoryChange = (e: any)=> {
      setSelectedCategory(e.target.value)
    }


    const onFileChange = (event: any) => {
      const file = event.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
    
      setFile(file);
    
      if (!window.FileReader) {
        console.error("FileReader API is not supported by your browser.");
        return;
      }
    
      const reader = new FileReader();
    
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        setImageBase64(`data:image/jpeg;base64,${base64String}`);
        createThumbnail(result);
      };
    
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    
      reader.readAsDataURL(file);
    };
    
    const createThumbnail = (dataUrl: string) => {
      const img = new Image();
      img.src = dataUrl;
    
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        if (ctx) {
          // Set desired thumbnail size
          const maxWidth = 100; // or any desired width
          const maxHeight = 100; // or any desired height
          let width = img.width;
          let height = img.height;
    
          // Calculate the aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
    
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
    
          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);
    
          // Convert the canvas content to a Data URL
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
    
          // Set the thumbnail Data URL to the state
          setImageThumbnail(thumbnailDataUrl);
        }
      };
    
      img.onerror = (error) => {
        console.error("Error loading image:", error);
      };
    };
   

    const onUploadClick = async ()=> {
        const params = {imageBase64: imageAddType === 'upload' ? imageBase64 : imageAddType === 'imageUrl' ? imageUrl : '', imageCategory: selectedCategory, imageName: imageAddType === 'upload' ? file?.name: `image${Math.random()}`, imageAddType: imageAddType, thumbnail: imageThumbnail}
        axios.post(BASE_URl+'addWallpapersApi', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success('Image added successfully')
               
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
    }  
    
    
    const onImageMethodChange = (e: any)=> {
      setImageUrl('')
      setImageBase64('')
      setImageAddType(e)
    }

    const onImageUrlChange = (e: any)=> {
      setImageUrl(e.target.value)
    }


console.log(imageAddType)
    return <>
  <Container className="Container">
      <Row>
        <h1>Add Wallpaper</h1>
      </Row>

     

      <Row className="input-container">
      <RadioButton label='Upload Image'  onChange={()=> onImageMethodChange('upload')} checked={imageAddType === 'upload'}/>
        <RadioButton label='Image Url'  onChange={(e: any)=> onImageMethodChange('imageUrl')} checked={imageAddType === 'imageUrl'}/>
        <Col>
          <div>
           {imageAddType === 'upload' ? <><label>Upload Image</label> 
           <input
              type="file"
              accept='.jpg'
              id="upload"
              onChange={(e) => onFileChange(e)}
            /></>  :  imageAddType === 'imageUrl' ? <> <label>Image Url</label> <input type='text' value={imageUrl} onChange={(e: any)=> onImageUrlChange(e)}/></> : <></>} 
            
          </div>
        </Col>
      </Row>

      <Row className="input-container">
        <Col>
          <div>
            <label>Add category</label>
           <input type='text' value={selectedCategory} onChange={(e: any)=> onCategoryChange(e)} />
          </div>
        </Col>
      </Row>

      <Row className="input-container">
        <Col>
          <div>
            
           {(imageBase64 || imageUrl) && selectedCategory && <Button  onClick={()=> onUploadClick()}>Upload</Button>}
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <ResultGrid
            className="ResultGrid"
            gridData={allWallpapersData}
            getAllResultService={getAllResultService}
            gridLoading={gridLoading}
          />
        </Col>
      </Row>
    </Container>
    
    </>
}

export default AdminPortalIndex