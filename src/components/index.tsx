import { useEffect, useState } from "react"

import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios'
import ResultGrid from "./ResultGrid"
import { BASE_URl } from "./libs/config";



const AdminPortalIndex = ()=> {


  const [file, setFile] = useState<any>('')

  const [imageBase64, setImageBase64] = useState<any>('')
  const [selectedCategory, setSelectedCategory] = useState<any>('')

  const [allWallpapersData, setAllWallpapersData] = useState<any>([])



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
        const params = {imageBase64: imageBase64, imageCategory: selectedCategory, imageName: file?.name}
        axios.post(BASE_URl+'addWallpapersApi', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success('Result added successfully')
               
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
    }    



    return <>
  <Container className="Container">
      <Row>
        <h1>Add Wallpaper</h1>
      </Row>
      <Row className="input-container">
        <Col>
          <div>
            
            <input
              type="file"
              accept='.jpg'
              id="upload"
              onChange={(e) => onFileChange(e)}
            />
          </div>
        </Col>
      </Row>

      <Row className="input-container">
        <Col>
          <div>
            
           <input type='text' value={selectedCategory} onChange={(e: any)=> onCategoryChange(e)} />
          </div>
        </Col>
      </Row>

      <Row className="input-container">
        <Col>
          <div>
            
           {imageBase64 && selectedCategory && <Button  onClick={()=> onUploadClick()}>Upload</Button>}
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