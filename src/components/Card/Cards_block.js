import React, { useState, useEffect, useRef } from "react";
import "./Card.css";
import Card from "./Card";
import InputStats from "../Inputs/Input_stats";
import { apiGetLimited, apiGetCount, apiGetTypes } from "../redux/apiGet";
import Pagination from "../Pagination/Pagination";
import styled from "styled-components";
import ropeEnd from "./img/rope-end.png";
import ropeBody from "./img/rope-body.png";
import { connect } from "react-redux";
import {
  saveLimit,
  saveOffset,
  saveCurrentPage,
} from "../redux/actions/pokemons/actions";
import { Drawer, Button, Radio, Space } from "antd";
import "antd/dist/antd.css";

function Cards_block(props) {
  const [pokemonsCount, setPokemonsCount] = useState(0);
  const [pokemonsTempCount, setPokemonsTempCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [types, setPokemonsTypes] = useState([]);
  const [state, setState] = useState({ visible: false, placement: "left" });
  const [filterObj, setFilterObj] = useState({ filterOptions: [] });
  const [statsFilter, setStatsFilter] = useState([]);
  const [typesArr, setTypesArr] = useState([]);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");

  const ropeRef = useRef(null);

  let filter = [];
  let statsFilterArr = [];
  const typeArr = [
    "HP",
    "Attack",
    "Defense",
    "Special-attack",
    "Special-defense",
    "Speed",
  ];

  const filt = filterObj.filterOptions;

  const pushFilters = () => {
    let tempArr = [],
      tempArr1 = [],
      tempArr2 = [],
      tempArr3 = [],
      tempArr4 = [],
      tempArr5 = [];
    statsFilter.forEach((el) => {
      if (el.hpFrom || el.hpTo) {
        if (!!el.hpFrom) {
          tempArr.unshift(99999);
          tempArr.unshift(el.hpFrom);
        } else if (!!el.hpTo) {
          tempArr.push(0);
          tempArr.push(el.hpTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            hp: {
              from: tempArr[0] || 0,
              to: tempArr[3] || tempArr[1],
            },
          },
        ];
      }
      if (el.attackFrom || el.attackTo) {
        if (!!el.attackFrom) {
          tempArr1.unshift(99999);
          tempArr1.unshift(el.attackFrom);
        } else if (!!el.attackTo) {
          tempArr1.push(0);
          tempArr1.push(el.attackTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            attack: {
              from: tempArr1[0] || 0,
              to: tempArr1[3] || tempArr1[1],
            },
          },
        ];
      }

      if (el.defenseFrom || el.defenseTo) {
        if (!!el.defenseFrom) {
          tempArr2.unshift(99999);
          tempArr2.unshift(el.defenseFrom);
        } else if (!!el.defenseTo) {
          tempArr2.push(0);
          tempArr2.push(el.defenseTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            defense: {
              from: tempArr2[0] || 0,
              to: tempArr2[3] || tempArr2[1],
            },
          },
        ];
      }
      if (el.specialAttackFrom || el.specialAttackTo) {
        if (!!el.specialAttackFrom) {
          tempArr3.unshift(99999);
          tempArr3.unshift(el.specialAttackFrom);
        } else if (!!el.specialAttackTo) {
          tempArr3.push(0);
          tempArr3.push(el.specialAttackTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            specialAttack: {
              from: tempArr3[0] || 0,
              to: tempArr3[3] || tempArr3[1],
            },
          },
        ];
      }
      if (el.specialDefenseFrom || el.specialDefenseTo) {
        if (!!el.specialDefenseFrom) {
          tempArr4.unshift(99999);
          tempArr4.unshift(el.specialDefenseFrom);
        } else if (!!el.specialDefenseTo) {
          tempArr4.push(0);
          tempArr4.push(el.specialDefenseTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            specialDefense: {
              from: tempArr4[0] || 0,
              to: tempArr4[3] || tempArr4[1],
            },
          },
        ];
      }
      if (el.speedFrom || el.speedTo) {
        if (!!el.speedFrom) {
          tempArr5.unshift(99999);
          tempArr5.unshift(el.speedFrom);
        } else if (!!el.speedTo) {
          tempArr5.push(0);
          tempArr5.push(el.speedTo);
        }
        statsFilterArr = [
          ...statsFilterArr,
          {
            speed: {
              from: tempArr5[0] || 0,
              to: tempArr5[3] || tempArr5[1],
            },
          },
        ];
      }
    });
    if (statsFilterArr.length === 0) {
      alert("Nema takogo!");
    }

    filter = [
      ...filter,
      name != "" ? { nameFilter: name } : {},
      typesArr.length != 0 ? { typeFilter: typesArr } : {},
      statsFilter.length != 0 ? { statFilter: statsFilterArr } : {},
    ];
    setState({ ...state, visible: false });
    !!filter.length != 0
      ? setFilterObj({ ...filterObj, filterOptions: filter })
      : setFilterObj({ filterOptions: [] });

    props.saveCurrentPage(1);
  };

  const getNewLimit = () => {
    if (
      (props.pokemons.pokemonsCurrentPage + 1) * limit + 5 >=
      pokemonsCount
    ) {
      alert("Pokemonov bolshe nema");
    } else {
      setLimit(limit + 5);
      if (!ropeRef.current.classList.contains("rope-animated")) {
        ropeRef.current.classList.add("rope-animated");
        setTimeout(() => {
          ropeRef.current.classList.remove("rope-animated");
        }, [1900]);
      }
    }
    props.saveCurrentPage(1);
  };

  const showDrawer = () => {
    setState({ ...state, visible: true });
  };

  const onClose = () => {
    setState({ ...state, visible: false });
  };

  useEffect(() => {
    apiGetCount().then((result) => {
      setPokemonsCount(result.data.count);
    });
    apiGetTypes().then((result) => {
      setPokemonsTypes(result.data.types);
    });
  }, []);

  useEffect(() => {
    apiGetLimited(
      limit,
      (props.pokemons.pokemonsCurrentPage - 1) * limit,
      filterObj
    )
      .then((result) => {
        setPokemons(result.data.pokemons);
        setPokemonsTempCount(result.data.count);
        console.log(result.data.pokemons);
      })
      .catch((result) => {
        alert("Nema takogo!");
      });
  }, [limit, props.pokemons.pokemonsCurrentPage, filt[0], filt[1], filt[2]]);

  useEffect(() => {
    statsFilter.forEach((element) => {
      if (Object.keys(element).length === 0) {
        const idxOfNull = statsFilter.findIndex(
          (name) => Object.keys(name).length === 0
        );
        statsFilter.splice(idxOfNull, 1);
      }
      const tempName = Object.keys(element);
      statsFilter.forEach((el) => {
        const tempNameTwo = Object.keys(el);
        if (tempNameTwo.includes(tempName[0])) {
          if (element[tempName] !== el[tempNameTwo]) {
            const obj = [
              statsFilter.findIndex(
                (name) => name[tempName[0]] === element[tempName]
              ),
            ];
            statsFilter.splice(obj, 1);
          }
        }
      });
    });
  }, [statsFilter]);

  const paginate = (pageNumber) => props.saveCurrentPage(pageNumber);
  const statFilter = (tempObj) => setStatsFilter([...statsFilter, tempObj]);

  const nextPage = props.pokemons.pokemonsCurrentPage + 1;
  const prevPage = props.pokemons.pokemonsCurrentPage - 1;

  return (
    <>
      <Blocks>
        <Block>
          <BlockFilter>
            <Space>
              <Radio.Group defaultValue={state.placement}></Radio.Group>
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
              <Span>
                Find by name{" "}
                <InputName
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />{" "}
                <br />
              </Span>{" "}
              <br />
              <Span>Find by stats</Span>
              {typeArr.map((type) => (
                <InputStats type={type} statFilter={statFilter}></InputStats>
              ))}
              <Span>Find by types</Span> <br />
              <TypeBlocks>
                {types.map((type) => (
                  <TypeBlock key={type}>
                    <InputType
                      type="checkbox"
                      id={type}
                      onClick={() => {
                        let typef = typesArr.includes(type);
                        if (!!typef) {
                          const idx = typesArr.indexOf(typef);
                          typesArr.splice(idx, 1);
                        } else {
                          setTypesArr([...typesArr, type]);
                        }
                      }}
                    ></InputType>
                    <TypeLabel forHtml={type}>{type}</TypeLabel>
                  </TypeBlock>
                ))}
              </TypeBlocks>
              <FindButton onClick={pushFilters}>Find!</FindButton>
            </Drawer>
          </BlockFilter>
          {!!pokemons.length}
          {!!pokemons.length ? (
            <div className="cards-block">
              {pokemons.map((pokemon) => (
                <Card
                  index={pokemon.id}
                  name={pokemon.name}
                  key={pokemon.name}
                />
              ))}
            </div>
          ) : (
            <h2>Wait!</h2>
          )}
        </Block>
        <Rope>
          <RopeBody src={ropeBody} ref={ropeRef} />
          <RopeEnd
            src={ropeEnd}
            alt="rope-end"
            style={{
              height: "100px",
            }}
            onClick={() => getNewLimit()}
          ></RopeEnd>
        </Rope>
      </Blocks>
      <Pagination
        currentPage={props.pokemons.pokemonsCurrentPage}
        pokemonsPerPage={limit}
        totalPokemons={
          !!pokemonsTempCount > 0 ? pokemonsTempCount : pokemonsCount
        }
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
}

export default connect(
  (state) => {
    const { pokemons } = state;
    return {
      pokemons,
    };
  },
  (dispatch) => ({
    saveLimit: (data) => dispatch(saveLimit(data)),
    saveOffset: (data) => dispatch(saveOffset(data)),
    saveCurrentPage: (data) => dispatch(saveCurrentPage(data)),
  })
)(Cards_block);

const Blocks = styled.div`
  display: flex;
  flex-direction: row;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Rope = styled.div`
  display: flex;
  flex-direction: column;
`;

const RopeBody = styled.img`
  height: 150px;
  width: 10px;
  margin: 0px 0px 0px 15px;
`;

const RopeEnd = styled.img``;

const BlockFilter = styled.div`
  width: 1000px;
  height: 100px;
  border: 1px solid;
  margin: 30px 0px 30px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Span = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
`;
const InputName = styled.input`
  margin: 10px 0px 10px 0px;
`;

const InputType = styled.input`
  height: 10px;
  width: 10px;
  margin: 5px;
`;
const TypeLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;
const TypeBlocks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const TypeBlock = styled.div`
  width: 100px;
`;
const FindButton = styled.button`
  margin-top: 50px;
  height: 50px;
  width: 270px;
`;
