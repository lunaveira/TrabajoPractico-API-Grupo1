import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TablePagination, Divider, Toolbar, Typography, Button, Paper, Box } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import DeleteIcon from "@mui/icons-material/Delete";
import SelfAligningImage from "../../../shared/components/SelfAligningImage";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AlertDialog from "./Delete";



import { red } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Select, MenuItem, InputLabel, FormControl, TextField, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse } from "@mui/material";




const styles = {
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
};

const rowsPerPage = 25;


// function createData(Nombre, Materia, Duracion, Frecuencia, Costo,id) {
//   return {
//     Nombre,
//     Materia,
//     Duracion,
//     Frecuencia,
//     Costo,
//     id
//   };
// }


function createData(Materia, Profesor, Tipo, Frecuencia, Duracion, Calificacion, Costo, id) {
  return {
    Materia, 
    Profesor, 
    Tipo, 
    Frecuencia, 
    Duracion,
    Calificacion,
    Costo,
    id
  };
}

let rows = [

  createData('Matemática', 'Paula Sarasa', 'Individual', 'Semanal', 2, 3, '$1000'),
    createData('Inglés', 'Tomas Malio', 'Grupal', 'Unica', 2, 4, '$1000'),
    createData('Informática', 'Ricardo Thompson', 'Individual', 'Semanal', 2, 5, '$1000'),
    createData('Historia', 'Omar Cuarterolo', 'Grupal', 'Mensual', 2, 5, '$1000'),
    createData('Inglés', 'Juan Valassina', 'Individual', 'Semanal', 2, 3, '$1000'),
    createData('Historia', 'Ricardo Whebe', 'Individual', 'Unica', 2, 4, '$1000'),
    createData('Literatura', 'Rodolfo Lascano', 'Grupal', 'Unica', 2, 2,'$1000'),
    createData('Ingles', 'Sarasa', 'Individual', 'Semanal', 2, 4, '$1000'),
    createData('Matemática', 'Gabriela Guido', 'Individual', 'Semanal', 2, 1, '$1000'),
    createData('Informática', 'Sarasa', 'Individual', 'Semanal', 2, 1, '$1000'),

];



function PostContent(props) {
  const {
    pushMessageToSnackbar,
    setPosts,
    posts,
    openAddPostModal,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(
    false
  );

  const [searchValue, setSearchValue] = useState("")
    const [searchValueTipo, setSearchValueTipo] = useState("")
    const [searchValueFrec, setSearchValueFrec] = useState("")
    const [calorieValue, setCalorieValue] = useState(0)

    const [openModal, setOpenModal] = useState(false)
    
    const [idClaseSeleccionada, setIdClaseSeleccionada] = useState(null)

    
  const [clases, setClases] = useState([])
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  




  const updateLista = useCallback(() => {

    fetch("http://localhost:8080/clases",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('TOKEN_USER')
        },
        method: "GET"
      })
      .then(async function (res) {

        const clases = await res.json();
        console.log(clases)

        const arr = []

        clases.forEach(clase => {
          arr.push(createData(clase.nombre, clase.materia, clase.duracion, clase.frecuencia, clase.costo,clase._id))
        })

        setClases(arr)

      })
      .catch(function (res) { }).finally(() => {

      })
  },[])
  useEffect(() => {

    fetch("http://localhost:4000/clases",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('TOKEN_USER')
        },
        method: "GET"
      })
      .then(async function (res) {
        const clases = await res.json();
        console.log(clases)

        const arr = []

        clases.forEach(clase => {
          arr.push(createData(clase.nombre, clase.materia, clase.duracion, clase.frecuencia, clase.costo,clase._id))
        })

        setClases(arr)

      })
      .catch(function (res) { }).finally(() => {

      })
  }, [])

  const closeDeletePostDialog = useCallback(() => {
    setIsDeletePostDialogOpen(false);
    setIsDeletePostDialogLoading(false);
  }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);

  const deletePost = useCallback(() => {
    setIsDeletePostDialogLoading(true);
    setTimeout(() => {
      const _posts = [...posts];
      const index = _posts.findIndex((element) => element.id === deletePost.id);
      _posts.splice(index, 1);
      setPosts(_posts);
      pushMessageToSnackbar({
        text: "Your post has been deleted",
      });
      closeDeletePostDialog();
    }, 1500);
  }, [
    posts,
    setPosts,
    setIsDeletePostDialogLoading,
    pushMessageToSnackbar,
    closeDeletePostDialog,
  ]);

  const onDelete = useCallback(() => {
    setIsDeletePostDialogOpen(true);
  }, [setIsDeletePostDialogOpen]);

  const handleChangePage = useCallback(
    (__, page) => {
      setPage(page);
    },
    [setPage]
  );

  const printImageGrid = useCallback(() => {
    if (posts.length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <Grid item xs={6} sm={4} md={3} key={post.id}>
                  <SelfAligningImage
                    src={post.src}
                    title={post.name}
                    timeStamp={post.timestamp}
                    options={[
                      {
                        name: "Delete",
                        onClick: () => {
                          onDelete(post);
                        },
                        icon: <DeleteIcon />,
                      },
                    ]}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box m={2}>
        <HighlightedInformation>
          No posts added yet. Click on &quot;NEW&quot; to create your first one.
        </HighlightedInformation>
      </Box>
    );
  }, [posts, onDelete, page]);

  return (

    <Grid container spacing={2} style={{marginBottom: '2.5%'}}>

    

      <Box m={2}>

      <Grid container spacing={1}>

        <Button
           variant="contained"
           color="primary"
           onClick={openAddPostModal}
           disableElevation
         >
           Agregar Clase
         </Button>

         </Grid>

         </Box>

         <Box m={6}></Box>

         <Grid container>

         
          <Card sx={{ maxWidth: 345, marginRight: '5%', marginBottom: '5%' }}>
    
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {/* {arr.Profesor.substring(0,1)} */}
                
                      </Avatar>
                    }
                   // title={arr.Profesor}
                   // header={arr.Materia}
                   // subheader={arr.Tipo}
                   
                  />
                  <CardMedia
                    component="img"
                    height="164"
                    image="https://www.educalinkapp.com/blog/wp-content/uploads/2021/03/sumala-chidchoi-132316259_m-675x450.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                       Esta clase de  será de forma  y te buscaremos ayudarte a pasar Tus Clases.
                      
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Costo 
                      </Typography>
                  </CardContent>    
                  <CardActions disableSpacing>
                                 
                  </CardActions>  


                  </Card>    


                  <Card sx={{ maxWidth: 345, marginRight: '5%', marginBottom: '5%' }}>
    
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {/* {arr.Profesor.substring(0,1)} */}
  
        </Avatar>
      }
     // title={arr.Profesor}
     // header={arr.Materia}
     // subheader={arr.Tipo}
     
    />
    <CardMedia
      component="img"
      height="164"
      image="https://www.educalinkapp.com/blog/wp-content/uploads/2021/03/sumala-chidchoi-132316259_m-675x450.jpg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
         Esta clase de  será de forma  y te buscaremos ayudarte a pasar Tus Clases.
        
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Costo 
        </Typography>
    </CardContent>    
    <CardActions disableSpacing>
                   
    </CardActions>  


    </Card>    


    <Card sx={{ maxWidth: 345, marginRight: '5%', marginBottom: '5%' }}>
    
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {/* {arr.Profesor.substring(0,1)} */}
  
        </Avatar>
      }
     // title={arr.Profesor}
     // header={arr.Materia}
     // subheader={arr.Tipo}
     
    />
    <CardMedia
      component="img"
      height="164"
      image="https://www.educalinkapp.com/blog/wp-content/uploads/2021/03/sumala-chidchoi-132316259_m-675x450.jpg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
         Esta clase de  será de forma  y te buscaremos ayudarte a pasar Tus Clases.
        
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Costo 
        </Typography>
    </CardContent>    
    <CardActions disableSpacing>
                   
    </CardActions>  


    </Card>    


    <Card sx={{ maxWidth: 345, marginRight: '5%', marginBottom: '5%' }}>
    
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {/* {arr.Profesor.substring(0,1)} */}
  
        </Avatar>
      }
     // title={arr.Profesor}
     // header={arr.Materia}
     // subheader={arr.Tipo}
     
    />
    <CardMedia
      component="img"
      height="164"
      image="https://www.educalinkapp.com/blog/wp-content/uploads/2021/03/sumala-chidchoi-132316259_m-675x450.jpg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
         Esta clase de  será de forma  y te buscaremos ayudarte a pasar Tus Clases.
        
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Costo 
        </Typography>
    </CardContent>    
    <CardActions disableSpacing>
                   
    </CardActions>  


    </Card>    
                  
                    
                     
                 
      </Grid>

      </Grid>

   
  );
 

}

PostContent.propTypes = {
  openAddPostModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPosts: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(PostContent);
