import React, { useState,useEffect } from 'react'
import {View, StyleSheet, ScrollView,Alert,LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-elements';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import moment from 'moment';
import axios from 'axios';
import Loader from "../components/Loader"
import { useTheme } from 'react-native-paper';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';
// import {Picker} from '@react-native-picker/picker';
// import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from 'react-native-dropdown-picker';
LogBox.ignoreAllLogs();


const DetailTaskScreen = ({route,navigation}) =>{
    // console.log("DETALLE TAREA:",route.params.DetalleTarea)
    // console.log("DETALLE ITEM:",route.params.tarea)
    // console.log("DETALLE ID:",route.params.id)
    const [editVisibles,setEditVisibles]=useState({})
    const fechaInicia = moment().format('YYYY-MM-DD, h:mm:ss a')
    //const fechaInicia = null
    const fechaFin= moment().format('YYYY-MM-DD, h:mm:ss a')
    const [orden,setOrden]=useState(route.params.DetalleTarea)
    const [loading,setLoading]=useState(false)
    const [valor,setValor] =useState("")
    const [ordenTareaAnterior, setTareaAnterior]= useState(route.params.tarea)
    const idUsuario=route.params.id
    let [disabled,setdisabled] =useState(orden.fechaInicia != null ?  true :false )
    //let [inputDisabled,setInputDisabled] =useState(orden.fechaInicia == null ?  true :false )
    let tareaDisabled=false
    let datoDisabled = false
    const {colors} = useTheme();
    let isValidDatoNumerico=false

    let datosPickerArray=[] 
      let datosPickerObject={}
      orden.datos.map( dato =>{
          dato.opciones.map(opcion =>{
            if( dato.id == opcion.idDato ){
              datosPickerObject={
                label: opcion.valor,
                value: opcion.valor
              }
              datosPickerArray.push(datosPickerObject)
            }
            
          })
          

      })
    const [items, setItems] = useState([datosPickerArray]);
    const [open, setOpen] = useState(false);
    
    

    const showEditDiv = (id) => {
        setEditVisibles(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }))
      };

      const  iniciarTarea = (idOrden, idTarea, idUsuario) =>{
        var ordenNueva = orden;
        //console.log("ORDEN NUEVA:", ordenNueva)
        ordenNueva.fechaInicia = fechaInicia;
        //console.log(ordenNueva.fechaInicia)
        
        
        const orden_Inicial = {
          tareas: [
            {
              idTarea: idTarea,
              idUsuario: idUsuario,
              fechaInicia: fechaInicia,
            },
          ],
        };
    
        axios
          .put(
            'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
            orden_Inicial,
          )
          .then(res => {
            //console.log(res);
            //console.log(res.data);
            setOrden(ordenNueva)
            setLoading(false)
            setdisabled(true);
            alert('se inicio la tarea');
          })
          .catch(error => {
            console.log(error.response);
            setLoading(false);
            alert('hubo un error');
          });
    
        //console.log("ORDEN_INICIAL: ",orden_Inicial);
      }

      const completarValor = (index, idTarea, idOrden, idUsuario, idDato,dato) =>{
        //console.log(dato.accionCorrectiva)
        //console.log(parseFloat(dato.minimo).toFixed(2))
        
        const minimo=parseFloat(dato.minimo)
        const maximo=parseFloat(dato.maximo)
        if (dato.tipo == "numero"){
          if (valor > maximo || valor < minimo){
            setValor("")
            if (dato.accionCorrectiva){
              return(
                alert(dato.accionCorrectiva)
              )
            }
            else{
              return(
                alert('el dato ingresado debe estar entre los valores minimos y maximos permitidos')
              )
            }
            
          }
        }
          
        
        
  
        var ordenNueva = orden;
        ordenNueva.datos_tareas[index].valor = valor;
        const ordenValor = {
          tareas: [
            {
              idTarea: idTarea,
              idUsuario: idUsuario,
              datos: [
                {
                  idDato: idDato,
                  valor: valor,
                },
              ],
            },
          ],
        };
 
        axios
          .put(
            'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
            ordenValor,
          )
          .then(res => {
            // console.log(res);
            // console.log(res.data);
            setOrden(ordenNueva);
            setLoading(false)
            setValor("")
            //setInputDisabled(false)
            showEditDiv(idDato)
            alert('se completo el valor');
          })
          .catch(error => {
            console.log(error.response);
            setLoading(false);
            setValor("")
            alert('hubo un error');
          });
        // console.log(ordenValor);

      }


      const chequearEstado = (fechaInicia) =>{
        if (fechaInicia != null) {
          //console.log('desactive el boton');
          return (disabled=true);
        } else {
          //console.log('no desactive el boton');
          return (disabled=false);
        }
      }

      const bloquearInput = () =>{
        if (orden.fechaInicia == null) {
          //console.log('desactive el input');
          return (disabled=true);
        } else {
          //console.log('active el input');
          return (disabled=false);
        }
      }

      const chequearTareaIniciada = (fechaInicia) =>{
        if (fechaInicia == null) {
          return (datoDisabled = true);
        }
      }

      const chequearTareas = (fechaInicia, orden) => {
        var arrayDedatosincompletos = [];
        if (fechaInicia == null) {
          //console.log('desactive el boton finalizar');
          return (tareaDisabled = true);
        }
        orden.datos_tareas.map(dt => {
          orden.datos.map(dato => {
            if (
              dt.idDato == dato.id &&
              dt.valor == null &&
              dato.tarea_dato.obligatorio == true
            ) {
              //console.log(dato.nombre + ' quedo sin asignar valor');
              arrayDedatosincompletos.push(dato.nombre);
            }
          });
        });
    
        if (arrayDedatosincompletos.length > 0) {
          return (tareaDisabled = true)
        }
      }

      const finalizarTarea = (idOrden, idTarea, idUsuario) => {
        var ordenNueva = orden;
        ordenNueva.fechaFin = fechaFin;
        const orden_Final = {
          tareas: [
            {
              idTarea: idTarea,
              idUsuario: idUsuario,
              fechaFin: fechaFin,
            },
          ],
        };
    
        axios
          .put(
            'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
            orden_Final,
          )
          .then(res => {
            //console.log(res);
            //console.log(res.data);
            setOrden(ordenNueva)
            setLoading(false)
            alert('se finalizo la tarea');
            navigation.goBack();
          })
          .catch(error => {
            console.log(error.response);
            setLoading(false)
            
            alert('hubo un error');
          });
    
        //console.log(orden_Final);

        //console.log(ordenNueva.tareas.length)
       
        var ordenNuevaLength = ordenNueva.tareas.length;

        let lastElement = ordenNueva.tareas[ordenNuevaLength - 1];

        //console.log("id orden",idOrden)
        //console.log(lastElement.idTarea);
        if(lastElement.idTarea === idTarea){
            const ordenFinalizada = {
                finalizada: true
              };
              axios
              .put(
                'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
                ordenFinalizada,
              )
              .then(res => {
                //console.log(res);
                //console.log(res.data);
                setOrden(ordenNueva)
                setLoading(false)
              })
              .catch(error => {
                console.log(error.response);
                setLoading(false)
              });
            //console.log("es el ultimo elemento del array")
        }



             
          
      }

      
    return(
      <View>
      <ScrollView>

        <Text style={{
          textAlign: 'center',
          marginTop: 10,
          color: colors.text}} h3>
          {orden.nombre}
        </Text>
        <Text style={{
          textAlign: 'center',
          marginTop: 10,
          color: colors.text}}>{orden.observaciones}</Text>

        <Text style={{
          textAlign: 'center',
          marginTop: 10,
          color: colors.text}}> id tarea: {orden.id}</Text>
        {/* <Text h4> id this.state.orden: {tarea.idthis.state.orden}</Text> */}
        {loading && <Loader />}
        {orden.fechaFin == null ? (
          <View>
            <Button
              style={{
                alignSelf: 'center',
                width: '60%',
              }}
              mode="contained"
              // disabled={chequearEstado(orden.fechaInicia)}
              disabled={disabled}
              onPress={() =>
                iniciarTarea(
                  orden.idOrden,
                  orden.id,
                  idUsuario,
                )
              }>
              iniciar tarea
            </Button>
            {orden.fechaInicia != null ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  color: colors.text}}>
                Comenzo La tarea!
              </Text>
            ) : null}
          </View>
        ) : null}

        <View>
          {orden.datos_tareas.map((dt, index) => (
            <View
              style={{
                borderWidth: 1,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                borderColor:colors.text
              }}
              key={index}>
              {orden.datos.map((dato, i) => (
                
                <View key={i}>
                  {dt.idDato == dato.id ? (
                    <View>
                      <Text style={{
                        textAlign: 'center',
                        color: colors.text}} h4>
                        {dato.nombre}
                      </Text>
                      {/* <Text style={styles.datoText} h4>
                        {dato.id}
                      </Text> */}
                      <Text style={{
                        textAlign: 'center',
                        color: colors.text}} h4>
                        {dato.unidadMedida}
                      </Text>
                      {/* <Text style={styles.datoText} h4>
                        {dato.tipo}
                      </Text> */}
                      {dato.tipo == 'numero' ? (
                        <View>
                          <Text style={{
                          textAlign: 'center',
                          color: colors.text}} h4>
                            min. {dato.minimo}
                          </Text>
                          <Text style={{
                          textAlign: 'center',
                          color: colors.text}} h4>
                            max. {dato.maximo}
                          </Text>
                        </View>
                      ) : null}
                      {dato.tipo == 'opcion' ? (
                        <View>
                          {dato.opciones.map((opcion, i) => (
                            <View key={i}>
                              <Text style={{
                              textAlign: 'center',
                              color: colors.text}} h4>
                                {opcion.valor}
                              </Text>
                            </View>
                          ))}
                        </View>
                      ) : null}

                      {dato.tarea_dato.obligatorio == true ? (
                        <View>
                          <Text style={{
                          textAlign: 'center',
                          color: colors.text}} h4>
                            El dato es obligatorio
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={{
                          textAlign: 'center',
                          color: colors.text}} h4>
                            El dato no es obligatorio
                          </Text>
                        </View>
                      )}
              

                      <Text style={{
                        textAlign: 'center',
                        color: colors.text}}h4>
                        {dt.valor}
                      </Text>
                      {orden.fechaFin == null ? (
                        <View>
                          {editVisibles[dt.idDato] ? (
                            <View>
                              {dato.tipo == 'numero' ? (
                                <TextInput
                                  style={{
                                    width: '60%',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '20%',
                                  }}
                                  label="Ingrese valor"
                                  returnKeyType="next"
                                  error={false}
                                  errorText={''}
                                  // disabled={bloquearInput(
                                  //   orden.fechaInicia,
                                  // )}
                                  disabled={bloquearInput()}
                                  onChangeText={nexText =>
                                    setValor(nexText)
                                  }
                                  defaultValue={valor}
                                  autoCapitalize="none"
                                  keyboardType="numeric"
                                />
                              ) : null
                              // (
                              //   <TextInput
                              //     style={{
                              //       width: '60%',
                              //       textAlign: 'center',
                              //       justifyContent: 'center',
                              //       marginLeft: '20%',
                              //     }}
                              //     label="Ingrese valor"
                              //     returnKeyType="next"
                              //     error={false}
                              //     errorText={''}
                              //     disabled={inputDisabled}
                              //     // disabled={bloquearInput(
                              //     //   orden.fechaInicia,
                              //     // )}
                              //     onChangeText={valor =>
                              //       setValor(valor)
                              //     }
                              //     value={valor}
                              //     autoCapitalize="none"
                              //   />
                              // )
                              }

                              { dato.tipo =="opcion" ? (
                                <View style={{marginBottom:5}}>
                                  
                                  {/* <Picker
                                    style={{ flex:1,marginLeft:"20%",alignItems:'center',justifyContent:'center',height: 40, width: "50%" }}
                                    selectedValue={valor}
                                    onValueChange={(itemValue, itemIndex) =>
                                      setValor(itemValue)
                                    }>
                                      {console.log("VALOOR",valor)}
                                       {dato.opciones.map((opcion,indexOpcion) =>(
                                          <Picker.Item key={indexOpcion} label={opcion.valor} value={opcion.valor} />
                                      ))} 
                                    
                                </Picker> */}
                                <View style={{
                                    width:"85%",
                                    marginLeft:30,
                                  }}>
                                    <DropDownPicker
                                  //loading={loading}
                                  placeholder="Seleccione una opcion"
                                  placeholderStyle={{
                                    color: "grey",
                                    fontWeight: "bold"
                                  }}
                                  
                                  open={open}
                                  value={valor}
                                  items={datosPickerArray}                             
                                  setOpen={setOpen}
                                  setValue={setValor}
                                  // textStyle={{
                                  //   fontSize: 15
                                  // }}
                                  // labelStyle={{
                                  //   fontWeight: "bold"
                                  // }}
                                  
                                  setItems={setItems}
                                />

                                </View>
                                
                                 {/* <RNPickerSelect
                                    onValueChange={(valor) => setValor(valor)}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{ label: "Select your favourite language", value: null }}
                                    items={datosPickerArray}
                                    //style={pickerSelectStyles}
                                /> */}
                                </View>
                              ) :(
                                null
                              )
                              }
                              { dato.tipo =="cadena" ? (
                                    <TextInput
                                    style={{
                                      width: '60%',
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      marginLeft: '20%',
                                    }}
                                    label="Ingrese valor"
                                    returnKeyType="next"
                                    error={false}
                                    errorText={''}
                                    disabled={bloquearInput()}
                                    // disabled={bloquearInput(
                                    //   orden.fechaInicia,
                                    // )}
                                    onChangeText={valor =>
                                      setValor(valor)
                                    }
                                    value={valor}
                                    autoCapitalize="none"
                                  />
                              ) :(
                                null
                              )
                              }

                              <View style={{flex: 1, flexDirection: 'row'}}>
                                <Button
                                  style={{
                                    width: '45%',
                                    marginLeft: 15,
                                    alignSelf: 'center',
                                  }}
                                  mode="contained"
                                  onPress={() =>
                                    completarValor(
                                      index,
                                      // orden,

                                      orden.id,
                                      orden.idOrden,
                                      idUsuario,
                                      dato.id,
                                      dato
                                    )
                                  }>
                                  Ingresar
                                </Button>
                                <Button
                                  style={{
                                    width: '45%',
                                    marginLeft: 4,
                                    alignSelf: 'center',
                                  }}
                                  mode="contained"
                                  onPress={() => showEditDiv(dt.idDato)}>
                                  Cancelar
                                </Button>
                              </View>
                            </View>
                          ) : (
                            <Button
                              style={{
                                alignSelf: 'center',
                                width: '50%',
                              }}
                              disabled={chequearTareaIniciada(orden.fechaInicia)}
                              mode="contained"
                              onPress={() => showEditDiv(dt.idDato)}>
                              Ingresar Valor
                            </Button>
                          )}
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              ))}
              
            </View>
          ))}

          {/* {orden.fechaInicia!=null && orden.fechaFin !=null ? 
            <View>
            <Text style={{
                textAlign: 'center',marginTop:10,
                color: colors.text}} h4>
                Fecha fin de tarea:
              </Text>
              <Text style={{
                textAlign: 'center',
                color: colors.text}} h4>
                {format(parseISO(orden.fechaFin), 'dd/MM/yyyy kk:mm:ss')}
              </Text>
            </View>
          : 
          null} */}
          
          {orden.datos_tareas.map(dt => (
            <View>
              {orden.datos.map(dato => (
                <View>
                  {dt.idDato == dato.id &&
                  dt.valor == null &&
                  dato.tarea_dato.obligatorio == true &&
                  orden.fechaInicia != null ? (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#008B84"
                        }}>
                        {' '}
                        El Dato {dato.nombre} quedo sin asignar
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ))}

          {orden.fechaFin == null ? (
            <Button
              style={{
                alignSelf: 'center',
                width: '60%',
              }}
              mode="contained"
              disabled={chequearTareas(
                orden.fechaInicia,
                orden,
              )}
              onPress={() =>
                finalizarTarea(
                  orden.idOrden,
                  orden.id,
                  idUsuario,
                )
              }>
              finalizar tarea
            </Button>
          ) : null}
        </View>
        <Text></Text>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    marginTop: 10,
    color: "#008B84",
  },
  datoText: {
    textAlign: 'center',
  },
});

export default DetailTaskScreen