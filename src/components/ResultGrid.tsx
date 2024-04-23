import { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import Button from 'react-bootstrap/Button';

import { toast } from 'react-toastify';

import axios from 'axios'
import GridLoader from "./GridLoader";
import { BASE_URl } from "./libs/config";

const ResultGrid = ({
    gridData,
    getAllResultService,
    gridLoading}: any)=> {

        const [mainGridData, setMainGridData] = useState<any>([])

        useEffect(()=> {
            const data = gridData.map((item: any, k: number)=> {
                return {...item, slNo: k + 1}
            })
    
            setMainGridData(data)
        },[gridData])

    const CustomActionCell = (props: any)=> {
      

        const onDeleteClick = ()=> {
            const params = {id: props.dataItem.imageId}
            axios.post(BASE_URl+'deleteWallpapersApi', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success(response.data.message)
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
        }
       return  <td>  <Button className="btn btn-danger" onClick={()=> onDeleteClick()}>Delete</Button></td>
    }


    return <>
    <h1>All Wallpapers</h1>

    {gridLoading && <GridLoader />}

    <Grid style={{ height: "100vh", width: '100vw' }} data={mainGridData}>
      <GridColumn field="slNo" title="Sl No" width="100px" />
      <GridColumn field="imageName" title="Image Name" width="150px" />
      <GridColumn field="imageId" title="Image ID" width="150px" />
      <GridColumn field="imageCategory" title="Category" width="150px" />
      <GridColumn  title="Actions" width="200px" cell={(props: any)=> CustomActionCell(props)}/>
    </Grid>
    </>
}

export default ResultGrid