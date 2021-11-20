import React, { useState ,useEffect} from 'react'
import {
    Button,
    View,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    SectionList,
    LogBox
  } from 'react-native';
import {Header, ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Searchbar} from 'react-native-paper';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

LogBox.ignoreLogs(['Warning: each...']); 

const TasksScreen =({route,navigation}) =>{
    console.log("TASKS ID:",route.params.id);
    const id= route.params.id
    const [loading,setLoading] = useState(true);
    const [arrayholder,setArrayHolder] = useState([])
    const [dataOrdenes, setDataOrdenes] = useState([])
    const [value, setValue] = useState("")
    const [ordenes, setOrdenes] =useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [memory, setMemory] = useState([])
    const {colors} = useTheme();


  

    useEffect(() => {
        const getData = async () => {
          const response = await fetch('https://daprolac.herokuapp.com/api/v1/ordenes/?eager=1');
          const data = await response.json();
          setDataOrdenes(findOrdenesById(data.payload));
          setMemory(findOrdenesById(data.payload))
          setLoading(false)
          //console.log(dataOrdenes)
        };
        getData();
      }, []);

    function onRefresh() {
        setRefreshing(true);
        const url = 'https://daprolac.herokuapp.com/api/v1/ordenes/?eager=1';
        return fetch(url)
          .then(response => response.json())
          .then(responseJson => {
              setRefreshing(false)
              setDataOrdenes(findOrdenesById(responseJson.payload))
              setMemory(findOrdenesById(responseJson.payload))
              setLoading(false)
          })
          .catch(error => {
            console.error(error);
          });
      };
      
    function findOrdenesById(ordenes) {
        var ordenesById = [];
        var tareaObjeto = {};
    
        ordenes.map(orden => {
          orden.tareas.map(tarea => {
            if (tarea.idUsuario == id) {
              orden.proceso.tareas.map(t => {
                if (tarea.idTarea == t.id && tarea.fechaFin == null) {
                  
                  tareaObjeto = {
                    id: t.id,
                    nombre: t.nombre,
                    idOrden: orden.id,
                    proceso_tarea: t.proceso_tarea,
                    observaciones: t.observaciones,
                    fechaInicia: tarea.fechaInicia,
                    fechaFin: tarea.fechaFin,
                    fechaIniciaProp: tarea.fechaIniciaProp,
                    diasAntecesora:t.proceso_tarea.diasAntecesora,
                    horasAntecesora:t.proceso_tarea.horasAntecesora,
                    minutosAntecesora:t.proceso_tarea.minutosAntecesora,
                    datos: t.datos,
                    datos_tareas: tarea.datos,
                  };
                  ordenesById.push(tareaObjeto);
                }
              });
            }
          });
        });
        ordenesById = ordenesById.sort(
          (a, b) => a.fechaIniciaProp > b.fechaIniciaProp,
        );
    
        return ordenesById;
      }

      const searchTarea = value => {
        const filterDeDataOrdenes = memory.filter(dataOrdenes => {
          let dataOrdenesLowercase = dataOrdenes.nombre.toLowerCase();
    
          let searchTermLowercase = value.toLowerCase();
    
          return dataOrdenesLowercase.indexOf(searchTermLowercase) > -1;
        });
        setDataOrdenes(filterDeDataOrdenes);
        setValue(value);
      };

      function renderTarea(item) {
        // item.datos.map(dato => {
        //   console.log(dato.nombre);
        // });
    
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailTaskScreen', {
                DetalleTarea: item,
                tarea: dataOrdenes,
                id:id
                //tarea: tarea,
              });
            }}
            //onPress={() => this.props.onPressDetalle(item)}
          >
            {/* <Separator bordered style={{color: 'red'}}>
              <Text>{item.idOrden}</Text>
            </Separator> */}
    
            <ListItem
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: '95%',
                marginLeft: 10,
                marginTop: 10,
              }}
              bottomDivider>
              <Icon2 size={20} name="tasks" />
    
              <ListItem.Content>
                <ListItem.Title>
                  {/* Id Tarea: {item.id} */}
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.nombre}
                  </Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  fecha:
                  {format(parseISO(item.fechaIniciaProp), 'dd/MM/yyyy kk:mm:ss')}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }
      console.log("data: ",dataOrdenes[4])
    if (loading) {
        return (
          <View style={{paddingTop: 100}}>
            <ActivityIndicator size="large" color="#008B84" />
          </View>
        );
      }
    return (
        <View >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
          
            <Text style={{marginTop:10,marginLeft:20,color:colors.text,marginBottom:10}} h4>
              Lista de tareas
            </Text>
            <Searchbar
                  placeholder="Buscar Tarea..."
                  style={{
                    backgroundColor: 'white',
                    width: "93%",
                    height: 40,
                    marginLeft:15,
                    paddingTop: 1,
                    size: 60,
                  }}
                  onChangeText={value => searchTarea(value)}
                  value={value}
                />
             <FlatList
              data={dataOrdenes}
              numColumns={1}
              renderItem={({item}) => renderTarea(item)}
              keyExtractor={(item, index) => index.toString()}
            /> 
            {/* <Text style={styles.headline} h4>
              Lista de tareas Completadas
            </Text>
            <FlatList
              data={this.state.tareasCompletadas}
              numColumns={1}
              renderItem={({item}) => this.renderTareaCompletada(item)}
              keyExtractor={(item, index) => index.toString()}
            /> */}
        </ScrollView>
        </View>
    );
}



export default TasksScreen;