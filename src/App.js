import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [radioList, setRadioList] = useState(["primaryradio", "secondary", "grenade", "other"]);
  const [currentKey, setCurrentKey] = useState({});
  const [BGCUSEDKEY, setBGCUSEDKEY] = useState("#16a085");
  const [defaultBgColor, setDefaultBgColor] = useState("");

  useEffect(() => {
    var ItemKey, KeyList;

    KeyList = [];
  
    KeyList.contains = function(ref) {
      var x;
      x = 0;
      while (x < KeyList.length) {
        if (KeyList[x].ref === ref) {
          return true;
        } else {
          x++;
        }
      }
      return false;
    };
  
    KeyList.list = function() {
      var y, _results;
      y = 0;
      _results = [];
      while (y < KeyList.length) {
        console.log(KeyList[y]);
        _results.push(y++);
      }
      return _results;
    };
  
    KeyList.get = function(ref) {
      var x;
      x = 0;
      while (x < KeyList.length) {
        if (KeyList[x].ref === ref) {
          return KeyList[x];
        } else {
          x++;
        }
      }
    };
  
    KeyList.removeKey = function(ref) {
      var y, _results;
      y = KeyList.length;
      _results = [];
      while (y--) {
        if (KeyList[y] === ref) {
          _results.push(KeyList.splice(y, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
  
    ItemKey = (function() {
      function ItemKey(ref, selected, primary, secondary, grenade, other, custom, itemsRef) {
        this.ref = ref;
        this.selected = selected != null ? selected : false;
        this.primary = primary != null ? primary : "";
        this.secondary = secondary != null ? secondary : "";
        this.grenade = grenade != null ? grenade : [];
        this.other = other != null ? other : [];
        this.custom = custom != null ? custom : "";
        this.itemsRef = itemsRef != null ? itemsRef : [];
        if (!KeyList.contains(ref)) {
          KeyList.push(this);
        }
      }
  
      ItemKey.prototype.getValue = function() {
        if (this.ref.firstElementChild) {
          return this.ref.firstElementChild.innerHTML;
        } else {
          return this.ref.innerHTML;
        }
      };
  
      ItemKey.prototype.getString = function() {
        var g, grenadeS, o, otherS, _i, _j, _len, _len1, _ref, _ref1;
        grenadeS = "";
        otherS = "";
        if (this.grenade.length > 0) {
          _ref = this.grenade;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            g = _ref[_i];
            grenadeS += " " + g.value;
          }
        }
        if (this.other.length > 0) {
          _ref1 = this.other;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            o = _ref1[_j];
            otherS += " " + o.value;
          }
        }
        if (this.primary + this.secondary + grenadeS + otherS + this.custom !== "") {
          return "bind " + "\"" + this.getValue() + "\" \"" + this.primary + this.secondary + grenadeS + otherS + this.custom + "\"&#10;";
        } else {
          return false;
        }
      };
  
      ItemKey.prototype.containsArr = function(arr, ref) {
        var x;
        x = 0;
        while (x < arr.length) {
          if (arr[x].id === ref.id) {
            return true;
          } else {
            x++;
          }
        }
        return false;
      };
  
      ItemKey.prototype.addInArray = function(arr, ref) {
        var y, _results;
        if (!this.containsArr(arr, ref)) {
          return arr.push(ref);
        } else {
          y = arr.length;
          _results = [];
          while (y--) {
            if (arr[y] === ref) {
              _results.push(arr.splice(y, 1));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };
  
      ItemKey.prototype.focus = function() {
        var x;
        console.log("focus");
        x = 0;
        while (x < KeyList.length) {
          console.log(KeyList[x]);
          KeyList[x].ref.classList.remove("focus");
          x++;
        }
        return this.ref.classList.add("focus");
      };
  
      return ItemKey;
  
    })();
  
    window.ItemKey = ItemKey;
  
    window.KeyList = KeyList;

    var selectedkey = document.getElementById("selectedkey");
    var keys = document.querySelectorAll(".keyboard table tbody tr td");
    var textArea = document.getElementById("text-result");
	  var customText = document.getElementById("customTextArea");
    // window.defaultBgColor = keys[0].style.backgroundColor;

    function selectKey(key) {
        selectedkey.innerText = key.getValue();
        deselectAllKey();
        deselectAllWep();
		    loadCurrentKey();
        key.ref.style.backgroundColor = "darkgreen";
    }

    function selectWep(wep) {
        if (typeof currentKey.primary === "undefined")
            return false;
        switch (wep.name) {
            case "primaryradio":
                currentKey.itemsRef["primary"] = wep;
                currentKey.primary = wep.value;
                update();
                break;
            case "secondary":
                currentKey.itemsRef["secondary"] = wep;
                currentKey.secondary = wep.value;
                update();
                break;
            case "grenade":
                currentKey.addInArray(currentKey.grenade, wep);
                update();
                break;
            case "other":
                currentKey.addInArray(currentKey.other, wep);
                update();
                break;
        }
    }

    function showUsedKey() {
        for (var i = 0; i < KeyList.length; i++) {
            if (KeyList[i].getString() != false) {
                KeyList[i].ref.style.backgroundColor = BGCUSEDKEY;
            }
        }
    }

    function deselectAllKey() {
        for (var key = 0; key < keys.length; key++) {
            keys[key].s = false;
            keys[key].style.backgroundColor = defaultBgColor;
        }
        showUsedKey()
    }

    function deselectAllWep() {
        for (var radio in radioList) {
            var ele = document.getElementsByName(radioList[radio]);
            for (var i = 0; i < ele.length; i++)
                ele[i].checked = false;
        }
		customText.value = '';
    }

	function loadCurrentKey() {
		if (currentKey.itemsRef != undefined) {
			if (currentKey.itemsRef["primary"] != undefined)
				currentKey.itemsRef["primary"].checked = true;
			if (currentKey.itemsRef["secondary"] != undefined)
				currentKey.itemsRef["secondary"].checked = true;
		}
		if (currentKey.grenade != undefined) {
			for (var g in currentKey.grenade) {
				currentKey.grenade[g].checked = true;
			}
		}
		if (currentKey.other != undefined) {
			for (var o in currentKey.other) {
				currentKey.other[o].checked = true;
			}
		}
		if (currentKey.custom != undefined) {
			customText.value = currentKey.custom;
		}
	}

    function update() {
        textArea.innerHTML = "";
        for (var i = 0; i < KeyList.length; i++) {
            if (KeyList[i].getString() != false)
                textArea.innerHTML += KeyList[i].getString();
        }
    }

//Keys
    for (var key = 0; key < keys.length; key++) {
        if (keys[key].className != "empty") {
            keys[key].addEventListener('click', function () {
                if (KeyList.contains(this)) {
                    currentKey = KeyList.get(this);
                }
                else {
                    currentKey = new ItemKey(this, true);
                }
                //console.log("------------------------------------------------");
                //KeyList.list();
                selectKey(currentKey);
            })
        }
    }
//Weapons
    var wep;
    for (var list in radioList) {
        var allRadios = document.getElementsByName(radioList[list]);
        for (var x = 0; x < allRadios.length; x++) {
            allRadios[x].addEventListener('click', function () {
                selectWep(this);
            })
        }
    }

    function reset() {
        currentKey = {};
        textArea.innerHTML = "";
		customText.value = "";
        KeyList.length = 0;
        selectedkey.innerText = "";
        deselectAllKey();
        deselectAllWep();
    }

    function resetKey(key) {
        currentKey = {};
        KeyList.removeKey(key);
        selectedkey.innerText = "";
		customText.value = "";
        update();
        deselectAllWep();
        deselectAllKey();
    }

    document.getElementById("resetkey").addEventListener('click', function () {
        resetKey(currentKey)
    });

    document.getElementById("reset").addEventListener('click', function () {
        reset();
    });

    document.getElementById("copy").addEventListener('click', function () {
        textArea.select();
    });

	customText.addEventListener("keyup", function () {
		currentKey.custom = customText.value;
		update();
		//TODO Reset et rechargement lors du changement de touche
	});

    function toggleDisplay(div) {
        if (div.style.display != "none") {
            div.style.display = "none";
        }
        else {
            div.style.display = "block";
        }
    }

    document.getElementById("disrifle").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("rifles"));
        e.preventDefault();
        return false;
    });
    document.getElementById("dissmg").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("smgs"));
        e.preventDefault();
        return false;
    });
    document.getElementById("disheavy").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("heavy"));
        e.preventDefault();
        return false;
    });
    document.getElementById("dissecondary").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("gun"));
        e.preventDefault();
        return false;
    });
    document.getElementById("disgre").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("grenades"));
        e.preventDefault();
        return false;
    });
    document.getElementById("disother").addEventListener('click', function (e) {
        toggleDisplay(document.getElementById("equipment"));
        e.preventDefault();
        return false;
    });
  }, []);

  return (
    <div className="App">
      <header>
        <p id="title">CS:GO BINDS GENERATOR</p>

        <div id="version">

          <p id="home_msg">
            This tool will help you bind commands to rapidly buy weapons in CS:GO<br />
            Do you have any request or do you just want to say hi ?<br />
            Feel free to do it on <a href="http://www.reddit.com/r/csgobindsgenerator/" target="_blank">/r/csgobindsgenerator</a>
          </p>
        </div>
      </header>

      <div id="container">

        <div className="keyboard">
          <div className="kb_up">
            <div className="arrow_home">
              <div className="home">
                <table>
                  <tr>
                    <td>Insert<span>ins</span></td>
                    <td>Home</td>
                    <td>Pg Up<span>pgup</span></td>
                  </tr>
                  <tr>
                    <td>Delete<span>del</span></td>
                    <td>End</td>
                    <td>Pg Down<span>pgdn</span></td>
                  </tr>
                  <tr>
                    <td className="empty"></td>
                    <td className="empty"></td>
                    <td className="empty"></td>
                  </tr>
                </table>
              </div>
              <div className="arrow">
                <table>
                  <tr>
                    <td className="empty"></td>
                    <td>↑<span>uparrow</span></td>
                    <td className="empty"></td>
                  </tr>
                  <tr>
                    <td>←<span>leftarrow</span></td>
                    <td>↓<span>downarrow</span></td>
                    <td>→<span>rightarrow</span></td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="numpad">
              <table>
                <tr>
                  <td>Num Lock<span>numlock</span></td>
                  <td>/<span>kp_slash</span></td>
                  <td>*<span>kp_multiply</span></td>
                  <td>-<span>kp_minus</span></td>
                </tr>
                <tr>
                  <td>7<span>kp_home</span></td>
                  <td>8<span>kp_uparrow</span></td>
                  <td>9<span>kp_pgup</span></td>
                  <td rowspan="2">+<span>kp_plus</span></td>
                </tr>
                <tr>
                  <td>4<span>kp_leftarrow</span></td>
                  <td>5<span>kp_5</span></td>
                  <td>6<span>kp_rightarrow</span></td>
                </tr>
                <tr>
                  <td>1<span>kp_end</span></td>
                  <td>2<span>kp_downarrow</span></td>
                  <td>3<span>kp_pgdn</span></td>
                  <td rowspan="2">Enter<span>kp_enter</span></td>
                </tr>
                <tr>
                  <td colspan="2">0<span>kp_ins</span></td>
                  <td>.<span>kp_del</span></td>
                </tr>
              </table>
            </div>
            <div className="output">
              <span id="reset" className="span-btn">Reset</span><span id="copy" className="span-btn">Select all</span>
              <textarea id="text-result" className="result" readonly></textarea>
            </div>
          </div>

          <div className="kb_down">
            <div className="main">
              <table>
                <tr>
                  <td>F1</td>
                  <td>F2</td>
                  <td>F3</td>
                  <td>F4</td>
                  <td>F5</td>
                  <td>F6</td>
                  <td>F7</td>
                  <td>F8</td>
                  <td>F9</td>
                  <td>F10</td>
                  <td>F11</td>
                  <td>F12</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>`</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>0</td>
                  <td>-</td>
                  <td>=</td>
                  <td>Backspace</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>Tab</td>
                  <td>Q</td>
                  <td>W</td>
                  <td>E</td>
                  <td>R</td>
                  <td>T</td>
                  <td>Y</td>
                  <td>U</td>
                  <td>I</td>
                  <td>O</td>
                  <td>P</td>
                  <td>[</td>
                  <td>]</td>
                  <td>\</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>CapsLock</td>
                  <td>A</td>
                  <td>S</td>
                  <td>D</td>
                  <td>F</td>
                  <td>G</td>
                  <td>H</td>
                  <td>J</td>
                  <td>K</td>
                  <td>L</td>
                  <td>;<span>semicolon</span></td>
                  <td>'</td>
                  <td>Enter</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>Shift</td>
                  <td>Z</td>
                  <td>X</td>
                  <td>C</td>
                  <td>V</td>
                  <td>B</td>
                  <td>N</td>
                  <td>M</td>
                  <td>,</td>
                  <td>.</td>
                  <td>/</td>
                  <td>Shift</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>Ctrl</td>
                  <td className="empty"></td>
                  <td>Alt</td>
                  <td id="space">Space</td>
                  <td>Alt</td>
                  <td className="empty"></td>
                  <td>Ctrl</td>
                </tr>
              </table>
            </div>
          </div>

        </div>


      </div>

      <div id="menu">
        <div id="selectdiv">
          <span id="pselect">Selected key : <span id="selectedkey"></span></span>
        </div>
        <div id="resetdiv">
          <button id="resetkey">Reset this key</button>
        </div>
        <hr />
        <div id="customText">
          <span>Custom text: </span><textarea name="custom" id="customTextArea" cols="60" rows="1"></textarea>
        </div>
        <hr />
        <div id="primary">
          <form id="primaryform">
            <div className="toggle-btn">
              <span>Rifles: </span>
              <button id="disrifle">Toggle</button>
            </div>
            <div id="rifles">
              <ul className='img-list'>
                <li>
                  <input id="galil" type="radio" name='primaryradio' value="buy galilar; buy famas;" />
                  <label for="galil">
                    <img src="img/weapons/weapon_galilar.png" alt="Galil AR" />
                  </label>
                </li>
                <li>
                  <input id="ak47" type="radio" name='primaryradio' value="buy ak47; buy m4a1;" />
                  <label for="ak47">
                    <img src="img/weapons/weapon_ak47.png" alt="Ak-47" />
                  </label>

                </li>
                <li>
                  <input id="sg556" type="radio" name='primaryradio' value="buy sg556; buy aug;" />
                  <label for="sg556">
                    <img src="img/weapons/weapon_sg556.png" alt="SG 556" />
                  </label>

                </li>
                <li>
                  <input id="awp" type="radio" name='primaryradio' value="buy awp;" />
                  <label for="awp">
                    <img src="img/weapons/weapon_awp.png" alt="AWP" />
                  </label>
                </li>
                <li>
                  <input id="famas" type="radio" name='primaryradio' value="buy famas; buy galilar;" />
                  <label for="famas">
                    <img src="./img/weapons/weapon_famas.png" alt="Famas" />
                  </label>
                </li>
                <li>
                  <input id="m4a1s" type="radio" name='primaryradio' value="buy m4a1; buy ak47;" />
                  <label for="m4a1s">
                    <img src="img/weapons/weapon_m4a1_silencer.png" alt="M4A1-S" />
                  </label>
                </li>
                <li>
                  <input id="m4a4" type="radio" name='primaryradio' value="buy m4a1; buy ak47;" />
                  <label for="m4a4">
                    <img src="img/weapons/weapon_m4a1.png" alt="M4A1" />
                  </label>
                </li>
                <li>
                  <input id="aug" type="radio" name='primaryradio' value="buy aug; buy sg556;" />
                  <label for="aug">
                    <img src="img/weapons/weapon_aug.png" alt="AUG" />
                  </label>
                </li>
                <li>
                  <input id="scout" type="radio" name='primaryradio' value="buy ssg08;" />
                  <label for="scout">
                    <img src="img/weapons/weapon_ssg08.png" alt="SSG 08" />
                  </label>
                </li>
                <li>
                  <input id="g3sg1" type="radio" name='primaryradio' value="buy g3sg1; buy scar20;" />
                  <label for="g3sg1">
                    <img src="img/weapons/weapon_g3sg1.png" alt="G3SG1" />
                  </label>
                </li>
                <li>
                  <input id="scar20" type="radio" name='primaryradio' value="buy scar20; buy g3sg1;" />
                  <label for="scar20">
                    <img src="img/weapons/weapon_scar20.png" alt="SCAR 20" />
                  </label>

                </li>
              </ul>
            </div>
            <div className="toggle-btn">
              <span>SMGs: </span>
              <button id="dissmg">Toggle</button>
            </div>

            <div id="smgs">
              <ul className='img-list'>
                <li>
                  <input id="mac10" type="radio" name='primaryradio' value="buy mac10; buy mp9;" />
                  <label for="mac10">
                    <img src="img/weapons/weapon_mac10.png" alt="MAC 10" />
                  </label>
                </li>
                <li>
                  <input id="mp9" type="radio" name='primaryradio' value="buy mp9; buy mac10;" />
                  <label for="mp9">
                    <img src="img/weapons/weapon_mp9.png" alt="MP9" />
                  </label>

                </li>
                <li>
                  <input id="mp7" type="radio" name='primaryradio' value="buy mp7;" />
                  <label for="mp7">
                    <img src="img/weapons/weapon_mp7.png" alt="MP7" />
                  </label>

                </li>
                <li>
                  <input id="ump" type="radio" name='primaryradio' value="buy ump45;" />
                  <label for="ump">
                    <img src="img/weapons/weapon_ump45.png" alt="UMP45" />
                  </label>

                </li>
                <li>
                  <input id="bizon" type="radio" name='primaryradio' value="buy bizon;" />
                  <label for="bizon">
                    <img src="img/weapons/weapon_bizon.png" alt="Bizon" />
                  </label>
                </li>
                <li>
                  <input id="p90" type="radio" name='primaryradio' value="buy p90;" />
                  <label for="p90">
                    <img src="img/weapons/weapon_p90.png" alt="P90" />
                  </label>
                </li>
              </ul>
            </div>
            <div className="toggle-btn">
              <span>Heavy: </span>
              <button id="disheavy">Toggle</button>
            </div>

            <div id="heavy">
              <ul className='img-list'>
                <li>
                  <input id="nova" type="radio" name='primaryradio' value="buy nova;" />
                  <label for="nova">
                    <img src="img/weapons/weapon_nova.png" alt="Nova" />
                  </label>
                </li>
                <li>
                  <input id="xm1014" type="radio" name='primaryradio' value="buy xm1014;" />
                  <label for="xm1014">
                    <img src="img/weapons/weapon_xm1014.png" alt="XM-1014" />
                  </label>
                </li>
                <li>
                  <input id="saw" type="radio" name='primaryradio' value="buy sawedoff; buy mag7;" />
                  <label for="saw">
                    <img src="img/weapons/weapon_sawedoff.png" alt="Sawed-Off" />
                  </label>
                </li>
                <li>
                  <input id="mag7" type="radio" name='primaryradio' value="buy mag7; buy sawedoff;" />
                  <label for="mag7">
                    <img src="img/weapons/weapon_mag7.png" alt="Swag-7" />
                  </label>
                </li>
                <li>
                  <input id="m249" type="radio" name='primaryradio' value="buy m249;" />
                  <label for="m249">
                    <img src="img/weapons/weapon_m249.png" title="M249" alt="M249" />
                  </label>
                </li>
                <li>
                  <input id="negev" type="radio" name='primaryradio' value="buy negev;" />
                  <label for="negev">
                    <img src="img/weapons/weapon_negev.png" title="Negev" alt="Negev" />
                  </label>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <hr />
        <div className="toggle-btn">
          <span>Secondary: </span>
          <button id="dissecondary">Toggle</button>
        </div>

        <form id="secondaryform">
          <div id="gun">
            <ul className='img-list'>
              <li>
                <input id="p250" type="radio" name='secondary' value="buy p250;" />
                <label for="p250">
                  <img src="img/weapons/weapon_p250.png" alt="P250" />
                </label>
              </li>
              <li>
                <input id="cz" type="radio" name='secondary' value="buy tec9; buy fiveseven;" />
                <label for="cz">
                  <img src="img/weapons/weapon_cz75a.png" alt="CZ-75a" />
                </label>

              </li>
              <li>
                <input id="tec9" type="radio" name='secondary' value="buy tec9; buy fiveseven;" />
                <label for="tec9">
                  <img src="img/weapons/weapon_tec9.png" alt="TEC-9" />
                </label>
              </li>
              <li>
                <input id="fiveseven" type="radio" name='secondary' value="buy fiveseven; buy tec9;" />
                <label for="fiveseven">
                  <img src="img/weapons/weapon_fiveseven.png" alt="Five-Seven" />
                </label>

              </li>
              <li>
                <input id="dual" type="radio" name='secondary' value="buy elite;" />
                <label for="dual">
                  <img src="img/weapons/weapon_elite.png" alt="Dual elite" />
                </label>
              </li>
              <li>
                <input id="deagle" type="radio" name='secondary' value="buy deagle; buy revolver;" />
                <label for="deagle">
                  <img src="img/weapons/weapon_deagle.png" alt="Desert eagle" />
                </label>
              </li>
              <li>
                <input id="revolver" type="radio" name='secondary' value="buy revolver; buy deagle;" />
                <label for="revolver">
                  <img src="img/weapons/weapon_revolver.png" alt="R8 Revolver" />
                </label>
              </li>
            </ul>
          </div>
        </form>
        <hr />
        <div className="toggle-btn">
          <span>Grenades: </span>
          <button id="disgre">Toggle</button>
        </div>

        <form id="greform">
          <div id="grenades">
            <ul className='img-list'>
              <li>
                <input id="hegrenade" type="checkbox" name='grenade' value="buy hegrenade;" />
                <label for="hegrenade">
                  <img src="img/weapons/weapon_hegrenade.png" alt="HE Grenade" />
                </label>
              </li>
              <li>
                <input id="flash" type="checkbox" name='grenade' value="buy flashbang;" />
                <label for="flash">
                  <img src="img/weapons/weapon_flashbang.png" title="Flashbang" alt="Flashbang" />
                </label>
              </li>
              <li>
                <input id="flash2" type="checkbox" name='grenade' value="buy flashbang;" />
                <label for="flash2">
                  <img src="img/weapons/weapon_flashbang.png" title="Flashbang" alt="Flashbang" />
                </label>
              </li>
              <li>
                <input id="smoke" type="checkbox" name='grenade' value="buy smokegrenade;" />
                <label for="smoke">
                  <img src="img/weapons/weapon_smokegrenade.png" alt="Smoke grenade" />
                </label>
              </li>
              <li>
                <input id="decoy" type="checkbox" name='grenade' value="buy decoy;" />
                <label for="decoy">
                  <img src="img/weapons/weapon_decoy.png" title="Decoy" alt="Decoy" />
                </label>
              </li>
              <li>
                <input id="molotov" type="checkbox" name='grenade' value="buy molotov; buy incgrenade;" />
                <label for="molotov">
                  <img src="img/weapons/weapon_molotov.png" alt="Molotov" />
                </label>
              </li>
              <li>
                <input id="incendiary" type="checkbox" name='grenade' value="buy incgrenade; buy molotov;" />
                <label for="incendiary">
                  <img src="img/weapons/weapon_incgrenade.png" alt="Incendiary grenade" />
                </label>
              </li>
            </ul>
          </div>
        </form>
        <hr />
        <div className="toggle-btn">
          <span>Equipment: </span>
          <button id="disother">Toggle</button>
        </div>

        <form id="equipform">
          <div id="equipment">
            <ul className='img-list'>
              <li>
                <input id="kevlar" type="checkbox" name='other' value="buy vest;" />
                <label for="kevlar">
                  <img src="img/weapons/equipment_kevlar.png" alt="Kevlar" />
                </label>
              </li>
              <li>
                <input id="helmet" type="checkbox" name='other' value="buy vesthelm;" />
                <label for="helmet">
                  <img src="img/weapons/equipment_helmet.png" alt="Helmet" />
                </label>
              </li>
              <li>
                <input id="kevlarhelm" type="checkbox" name='other' value="buy vesthelm; buy vest;" />
                <label for="kevlarhelm">
                  <img src="img/weapons/equipment_kevlarhelmet.png" alt="Kevlar + Helmet" />
                </label>
              </li>
              <li>
                <input id="defuse" type="checkbox" name='other' value="buy defuser;" />
                <label for="defuse">
                  <img src="img/weapons/equipment_defusekit.png" alt="Defuse kit" />
                </label>

              </li>
              <li>
                <input id="taser" type="checkbox" name='other' value="buy taser;" />
                <label for="taser">
                  <img src="img/weapons/weapon_taser.png" alt="Taser" />
                </label>

              </li>
            </ul>
          </div>
        </form>
      </div>
      <footer>
        <p>If you found this tool helpful, could you consider donating <a
          href="https://steamcommunity.com/tradeoffer/new/?partner=19434630&token=3A7_I28i">some spare skin ?</a>
          :-)</p>

        <p>Created by <a href="http://www.reddit.com/user/Outpox/">/u/Outpox</a> &bull; 2014 - 2015 (Released on <a
          href="https://github.com/Outpox/csgo-binds-generator">Github</a>)</p>
        <p>
          Discuss about it on <a href="http://www.reddit.com/r/csgobindsgenerator/" target="_blank">/r/csgobindsgenerator</a>
        </p>
      </footer>

    </div>
  );
}

export default App;
