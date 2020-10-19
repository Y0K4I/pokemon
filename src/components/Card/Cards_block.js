import React, { useState, useEffect, useRef } from 'react';
import './Card.css';
import Card from './Card';
import { apiGetLimited, apiGetCount, apiGetTypes } from '../redux/apiGet';
import Pagination from '../Pagination/Pagination';
import styled, { keyframes } from 'styled-components';
import ropeEnd from './img/rope-end.png'
import ropeBody from './img/rope-body.png'
import { connect } from 'react-redux';
import { createStore } from 'redux';
import  pokemonReducer  from '../redux/reducers/pokemonReducer';
import { saveLimit, saveOffset, saveCurrentPage} from '../redux/actions/pokemons/actions';
import { Drawer, Button, Radio, Space } from 'antd';
import 'antd/dist/antd.css'


const store = createStore(pokemonReducer)

function Cards_block(props) {
    const [pokemonsCount, setPokemonsCount] = useState(0)
    const [pokemonsTempCount, setPokemonsTempCount] = useState(0)
    const [pokemons, setPokemons] = useState([])
    const [types, setPokemonsTypes] = useState([])
    const [state, setState] = useState({ visible: false, placement: 'left' })
    const [filterObj, setFilterObj] = useState({filterOptions: []})
    const [statsFilter, setStatsFilter] = useState([])
    const [typesArr, setTypesArr] = useState([])

    const ropeRef = useRef(null)

    let pokeArr = []
    let filter = []
    let statsFilterObj = {}
    const typeArr = ["HP", "Attack", "Defense", "Special-attack", "Special-defense", "Speed"]
    
    let [name, setName] = useState('')

    apiGetCount().then(result => {
        setPokemonsCount(result.data.count)
    })

    const filt = filterObj.filterOptions

    const pushFilters = () => {
        statsFilter.forEach(el => {
            if(el.hpFrom || el.hpTo)
            statsFilterObj["hp"] = {from: el.hpFrom || 0, to: el.hpTo || 99999}
            if(el.attackFrom || el.attackTo)
            statsFilterObj["attack"] = {from: el.attackFrom || 0, to: el.attackTo || 99999}
            if(el.defenseFrom || el.defenseTo)
            statsFilterObj["defense"] = {from: el.defenseFrom || 0, to: el.defenseTo || 99999}
            if(el.specialattackFrom || el.specialattackTo)
            statsFilterObj["specialAttack"] = {from: el.specialattackFrom || 0, to: el.specialattackTo || 99999}
            if(el.specialdefenseFrom || el.specialdefenseTo)
            statsFilterObj["specialDefense"] = {from: el.specialdefenseFrom || 0, to: el.specialdefenseTo || 99999}
            if(el.speedFrom || el.speedTo)
            statsFilterObj["speed"] = {from: el.speedFrom || 0, to: el.speedTo || 99999}
        });
        filter = [...filter, name != '' ? {nameFilter: name} : {}, 
        typesArr.length != 0 ? {typeFilter: typesArr} : {},
        statsFilter.length != 0 ? {statFilter: [statsFilterObj]} : {}
        ]
        setState({...state, visible: false})
        !!filter.length != 0 ?  setFilterObj({...filterObj, filterOptions: filter}) : setFilterObj({filterOptions: []})
        
        props.saveCurrentPage(1)
    }

    const getNewLimit = () => {
        props.saveLimit(props.pokemons.pokemonsLimit + 5)
        if(!ropeRef.current.classList.contains('rope-animated')) {
            ropeRef.current.classList.add('rope-animated')
            setTimeout(() => {
                ropeRef.current.classList.remove('rope-animated')
        }, [1900])
        } 
    }


    const showDrawer = () => {
        setState({...state, visible: true})
    };

    const onClose = () => {
        setState({...state, visible: false})
    };
     
    useEffect(() => {
        apiGetTypes().then(result => {
            setPokemonsTypes(result.data.types)
        })       
    }, [])
    
    useEffect(() => {
        apiGetLimited(props.pokemons.pokemonsLimit, props.pokemons.pokemonsOffset, filterObj).then(result => {
            setPokemons(result.data)
        }).catch(result => {
            alert("Nema takogo blyat!")
        })

        apiGetLimited(pokemonsCount, props.pokemons.pokemonsOffset, filterObj).then(result => {
            if(filterObj.filterOptions.length > 0){
                if(props.pokemons.pokemonsOffset > 0){
                    setPokemonsTempCount(result.data.length + props.pokemons.pokemonsOffset)
                } else {
                    setPokemonsTempCount(result.data.length)
                }
            }
            console.log(pokemonsTempCount);
        }).catch(result => {
            console.log("Nema takogo blyat!");
        })

        
        if(props.pokemons.pokemonsCurrentPage)
        props.saveOffset(props.pokemons.pokemonsCurrentPage*props.pokemons.pokemonsLimit-props.pokemons.pokemonsLimit)
    }, [props.pokemons.pokemonsOffset, props.pokemons.pokemonsLimit, props.pokemons.pokemonsCurrentPage, props.pokemons.pokemonIndex, filt[0], filt[1], filt[2]])

    const paginate = (pageNumber) =>  props.saveCurrentPage(pageNumber)

    const nextPage = props.pokemons.pokemonsCurrentPage + 1
    const prevPage = props.pokemons.pokemonsCurrentPage - 1

    return(
        <>
            <Blocks>
                <Block>
                    <BlockFilter>
                        <Space>
                            <Radio.Group defaultValue={state.placement}>
                            </Radio.Group>
                            <Button type="primary" onClick={showDrawer}>
                                Open Filters
                            </Button>
                            </Space>
                            <Drawer
                                title="PokeFilter"
                                placement={state.placement}
                                closable={false}
                                onClose={onClose}
                                visible={state.visible}
                                key={state.placement}
                                width="325px"
                            >
                                <Span>Find by name <InputName type="text" onChange={(e) => setName(e.target.value)} /> <br/></Span> <br/>
                                <Span>Find by stats</Span>
                                    {typeArr.map(type => (
                                        <Stat><StatBlock>{type}:<StatRage><InputStat 
                                        onBlurCapture={(e) => {
                                            setStatsFilter([...statsFilter, {[type.replace('-', '').toLowerCase()+"From"]: Number(e.target.value)}])
                                        }}/> - <InputStat 
                                        onBlurCapture={(e) => {
                                            setStatsFilter([...statsFilter, {[type.replace('-', '').toLowerCase()+"From"]: Number(e.target.value)}])
                                        }}/></StatRage></StatBlock></Stat>
                                    ))}
                                <Span>Find by types</Span> <br/>
                                <TypeBlocks>
                                    {types.map(type => (
                                        <TypeBlock key={type}>
                                            <InputType type="checkbox" id={type} onClick={() => {
                                                let typef = typesArr.includes(type)
                                                if (!!typef) {
                                                    const idx = typesArr.indexOf(typef)
                                                    typesArr.splice(idx, 1)
                                                } else {
                                                    setTypesArr([...typesArr, type])
                                                }
                                                }}></InputType>
                                            <TypeLabel forHtml={type}>{type}</TypeLabel>
                                        </TypeBlock>
                                    ))}
                                </TypeBlocks>
                                <FindButton onClick={pushFilters} >Find!</FindButton>
                            </Drawer> 
                    </BlockFilter>
                    {!!pokemons.length}
                    {!!pokemons.length ? (<div className="cards-block">
                    {pokemons.map(pokemon => (
                        <Card 
                            index={pokemon.id}
                            name={pokemon.name} 
                            key={pokemon.name}
                        />
                    ))}
                </div>) : (<h2>Wait!</h2>)}
                </Block>
                <Rope>
                    <RopeBody src={ropeBody} ref={ropeRef} />
                    <RopeEnd src={ropeEnd} alt='rope-end' style={{
                        height: '100px'
                    }} onClick={() => getNewLimit()}></RopeEnd>
                </Rope>
            </Blocks>
            <Pagination
                currentPage={props.pokemons.pokemonsCurrentPage}
                pokemonsPerPage={props.pokemons.pokemonsLimit}
                totalPokemons = {!!pokemonsTempCount > 0 ? pokemonsTempCount : pokemonsCount}
                paginate={paginate} 
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </>
    );
}

export default connect(
    (state) => {
        const {pokemons} = state
        return{
            pokemons
        }
    },
    dispatch => ({
        saveLimit: data => dispatch(saveLimit(data)),
        saveOffset: data => dispatch(saveOffset(data)),
        saveCurrentPage: data => dispatch(saveCurrentPage(data)),
    })
)(Cards_block)


const Blocks = styled.div`
    display: flex;
    flex-direction: row;
`

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Rope = styled.div`
    display: flex;
    flex-direction: column;
    
`

const RopeBody = styled.img`
    height: 150px;
    width: 10px;
    margin: 0px 0px 0px 15px;
`

const RopeEnd = styled.img`
    
`

const BlockFilter = styled.div`
    width: 1000px;
    height: 100px;
    border: 1px solid;
    margin: 30px 0px 30px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const Span = styled.span`
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 700;
`
const InputName = styled.input`
    margin: 10px 0px 10px 0px;
`
const Stat = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin: 10px 0px 20px 0px;
`
const StatBlock = styled.div`
    display: flex;
    justify-content: space-between;
`

const StatRage = styled.div`
    display: flex;
    justify-content: flex-start;
`

const InputStat = styled.input`
    width: 50px;
    height: 25px;
    margin: 0px 10px 0px 10px;
`
const InputType = styled.input`
    height: 10px;
    width: 10px;
    margin: 5px;
`
const TypeLabel = styled.label`
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px
`
const TypeBlocks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
`
const TypeBlock = styled.div`
    width: 100px;
`
const FindButton = styled.button`
    margin-top: 50px;
    height: 50px;
    width: 270px;
`
