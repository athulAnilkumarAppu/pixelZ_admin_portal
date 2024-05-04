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



    const onFileChange = (event: any) => {
      const file: any = event.target.files[0];
      setFile(file)
      const reader: any = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        setImageBase64(`data:image/jpeg;base64,${base64String}`);
      };
  
      reader.readAsDataURL(file);
    };

    const onCategoryChange = (e: any)=> {
      setSelectedCategory(e.target.value)
    }
   

    const onUploadClick = async ()=> {
        const params = {imageBase64: imageAddType === 'upload' ? imageBase64 : imageAddType === 'imageUrl' ? imageUrl : '', imageCategory: selectedCategory, imageName: imageAddType === 'upload' ? file?.name: `image${Math.random()}`}
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