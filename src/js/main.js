import Swal from "sweetalert2";
import BlockDotDifficulty from "../../embarkArtifacts/contracts/BlockDotDifficulty";
import BlockDotDifficultyTournamentManager from "../../embarkArtifacts/contracts/BlockDotDifficultyTournamentManager";
import Token from "../../embarkArtifacts/contracts/ERC20";
import bigNumber from "bignumber.js";
import Contract from "web3-eth-contract";
import Web3 from "web3";
import "js-loading-overlay";
import axios from "axios";
import { SkynetClient } from "skynet-js";
import EmbarkJS from "../../embarkArtifacts/embarkjs";
import utils from "web3-utils";
const swarm = require("swarm-js").at("https://swarm-gateways.net");

var web3 = new Web3("http://localhost:8546");
const SablierContract = require("../../embarkArtifacts/contracts/Sablier")
  .default;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const client = new SkynetClient("https://siasky.net");
var adminAddress = "0x6Bb26B7893C6Aad51A429F445E0F9a625B0ef3E0";
//var web3 = new Web3("http://localhost:8546");
var user = JSON.parse(localStorage.getItem("username"));
let mediaRecorder = null;
const valuePerCollection = new bigNumber(2000000000000000000).toFixed();
var accounts = [],
  recordedBlobs = [];
console.log("window.URL: ", URL);
let stream = null;

EmbarkJS.onReady((err) => {
  checkMetamask();
  setUpBackEvent();
  initGame();
  function stopRecording() {
    mediaRecorder.stop();
  }
  function showLoading() {
    JsLoadingOverlay.show({ spinnerIcon: "ball-pulse-rise" });
  }
  function hideLoading() {
    JsLoadingOverlay.hide();
  }
  function handleSourceOpen(event) {
    console.log("MediaSource opened");
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log("Source buffer: ", sourceBuffer);
  }
  async function handleStop(event) {
    console.log("Recorder stopped: ", event);
    const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
    var data = await blobToVideo(superBuffer);
    await upload(data);
    window.document.dispatchEvent(
      new CustomEvent("playVideo", { bubbles: true, detail: data })
    );
  }

  async function blobToVideo(blob) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
          //callback(evt.target.result);
          resolve("data:video/webm;base64," + btoa(evt.target.result));
        }
      };
      reader.readAsBinaryString(recordedBlobs[0]);
    });
  }
  async function upload(file) {
    showLoading();
    return new Promise((resolve) => {
      try {
        swarm.upload(file).then(async (hash) => {
          console.log("Uploaded file. Address:", hash);
          await Promise.resolve(saveRecording(hash));
          hideLoading();
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
  /**
   * @dev This could easily be stored on skyDB but ran out of time
   * @param skylink The skynet url
   */
  async function saveRecording(skylink) {
    await BlockDotDifficultyTournamentManager.methods
      .saveRecording(utils.asciiToHex(skylink))
      .send();
  }
  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
      console.log("recorded data.....");
    }
  }

  function setUpRecorder() {
    stream = document.getElementById("myCanvas");
    stream = stream.captureStream();
    console.log("Started stream capture from canvas element: ", stream);
    let options = { mimeType: "video/webm" };
    recordedBlobs = [];
    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e0) {
      console.log("Unable to create MediaRecorder with options Object: ", e0);
      try {
        options = { mimeType: "video/webm;codecs=vp8" };
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log("Unable to create MediaRecorder with options Object: ", e1);
        try {
          options = { mimeType: "video/webm;codecs=daala" };
          mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          try {
            options = { mimeType: "video/webm;codecs=h264" };
            mediaRecorder = new MediaRecorder(stream, options);
          } catch (error) {
            try {
              options = { mimeType: "video/webm;codecs=h264" };
              mediaRecorder = new MediaRecorder(stream, options);
            } catch (error) {
              try {
                options = { mimeType: "video/mpeg" };
                mediaRecorder = new MediaRecorder(stream, options);
              } catch (error) {
                alert(
                  "MediaRecorder is not supported by this browser.\n\n" +
                    "Try Firefox 29 or later, or Chrome 47 or later, " +
                    "with Enable experimental Web Platform features enabled from chrome://flags."
                );
                console.error("Exception while creating MediaRecorder:", e2);
                return;
              }
            }
          }
        }
      }
    }
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
    console.log(
      "Created MediaRecorder",
      mediaRecorder,
      "with options",
      options
    );
  }
  function setUpBackEvent() {
    window.onhashchange = function() {
      //blah blah blah
      console.log("changing ....................");
      window.location.href = "/server";
    };
  }
  function startRecording() {
    mediaRecorder.start();
    //mediaRecorder.start();
  }
  function checkMetamask() {
    /*==========Metamask  Detection Start==========*/
    if (typeof web3 !== "undefined") {
      console.log("MetaMask is installed");
      var metamsk = activateEthListeners();
      if (metamsk) {
        warning("Game under development");
      } else {
        diplayMetaMaskError();
      }
    } else {
      diplayMetaMaskError();
      console.log("MetaMask is not installed");
    }
  }
  function diplayMetaMaskError() {
    window.location.href = "/error";
  }
  function warning(message) {
    Swal.fire("Warning", message, "warning");
  }
  function activateEthListeners() {
    try {
      window.ethereum.on("accountsChanged", function(accounts) {
        location.reload();
      });
      window.ethereum.on("networkChanged", function(netId) {
        location.reload();
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  function initGame() {
    web3.eth.getAccounts().then((acc) => {
      accounts = acc;
      web3.eth.defaultAccount = accounts[1];
    });
    Contract.setProvider("http://localhost:8546"); //@dev change when not in dev mode
    console.log("connected DApp..");
    const assets = ["ESKARGOT.ttf"];
    const path = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604712/";
    var paused = false;
    const frame = new Frame(
      "fit",
      window.innerWidth - 100,
      800,
      darker,
      green,
      assets,
      path
    );
    frame.on("ready", () => {
      zog("ready from ZIM Frame"); // logs in console (F12 - choose console)
      let stageW = frame.width;
      let stageH = frame.height;
      let stage = frame.stage;
      let timeCost = new bigNumber(100000000000000000000).toFixed();
      const intro = new Container(stageW, stageH).addTo();
      new Blob({
        controlType: "none",
        points: 6,
        color: green,
        interactive: false,
      })
        .center(intro)
        .sca(5, 3)
        .sha("rgba(0,0,0,.3)", 10, 15, 10);

      // LOGO
      // we make the logo intro relevant to the game
      // we pretend to place the logo on the shadow
      new Label("Block.Difficulty", 130, "game", dark)
        .center(intro)
        .mov(10, 10);
      const collector = new Label(
        "Block.Difficulty",
        130,
        "game",
        black
      ).center(intro);
      collector.wiggle("x", collector.x, -5, 10, 700, 1000);
      collector.wiggle("y", collector.y, -5, 10, 700, 1000);
      var start = new Button({
        width: 200,
        height: 80,
        corner: 0,
        backgroundColor: black,
        rollBackgroundColor: yellow,
        label: "LOADING",
      })
        .center(intro)
        .mov(0, 150);
      setTimeout(() => {
        intro.removeFrom();
        init();
        stage.update();
      }, 6000);

      async function init() {
        const blockDetails = await web3.eth.getBlock("latest");
        console.log("latest block details: ", blockDetails);
        // often need below - so consider it part of the template
        let currentLevelTime = 30;
        let currentLevel =
          blockDetails.totalDifficulty % 2 == 0
            ? Math.floor(Math.random() * (10 - 3 + 1) + 10)
            : 5;
        let sizePenalty =
          blockDetails.totalDifficulty % 2 == 0
            ? Math.floor(Math.random() * (10 - 5 + 1) + 10)
            : 5;
        await initLocalStorage();
        await start();
        if (user.record) {
          setUpRecorder();
          mediaRecorder.start();
          console.log("recording session... ", user.record);
        }
        async function initLocalStorage() {
          showLoading();
          // clearStorage();
          var tokens = [];
          var maxTokenCount = await BlockDotDifficulty.methods
            .totalSupply()
            .call({ gas: 6000000 });
          console.log("maxTokens: ", maxTokenCount);
          for (var i = 1; i < maxTokenCount; i++) {
            var nftMetaData = await BlockDotDifficulty.methods
              .tokenURI(i)
              .call({ gas: 6000000 });
            console.log("tokenURI: ", nftMetaData);
            nftMetaData = JSON.parse(nftMetaData);
            nftMetaData.id = i;
            tokens.push(nftMetaData);
          }
          var tempTokens = [];
          tokens.map(async (token) => {
            var minted = await BlockDotDifficultyTournamentManager.methods //@dev we need to burn tokens not collected :XD
              .isMinted(token.id)
              .call();
            if (!minted) {
              tempTokens.push(token);
            }
          });
          localStorage.setItem(
            "colorsCollected",
            JSON.stringify({
              nfts: tempTokens,
              collected: [],
              nftAddresses: [],
            })
          );
          hideLoading();
        }

        async function start() {
          createPauseEvent();
          createContinueEvent();
          setUpRecorder();

          var tile = new Tile({
            obj: new Circle({ min: 20, max: 20 }, [
              yellow,
              gray,
              black,
              red,
              green,
            ]),
            cols: currentLevel,
            rows: currentLevel,
            spacingH: 100,
            spacingV: 100,
          }).animate({
            props: { scale: 1 },
            rewind: true,
            loop: true,
            ease: "elasticOut",
            time: { min: 1500, max: 3000 },
            sequence: 0,
          });

          var total = tile.items.length;
          tile.loop((dot) => {
            if (dot.color == dark) total--;
          });
          var world = new Container(tile.width, tile.height).center();
          tile.centerReg(world);
          new Rectangle(tile.width, tile.height, clear, green, 2, 50, true)
            .alp(0.5)
            .center(world);

          const colors = [green, yellow, black, gray];
          let currentColor = Promise.resolve(setPlayerColor(colors));
          const player = new Blob({
            color: currentColor,
            borderColor: "black",
            borderWidth: 1.5,
            interactive: false,
            width: 1.5,
            height: 1.5,
            text: "User 1",
          })
            .transformPoints("scale", 0.4)
            .transformPoints("rotation", 90)
            .centerReg(world);
          new Label({
            text: user.username,
            size: 55,
            color: "white",
          }).centerReg(player);
          frame.follow(player);

          series(colors);
          async function setPlayerColor(colors) {
            return new Promise((resolve) => {
              var tempColor = colors[Math.round(rand(colors.length))];
              while (tempColor !== undefined) {
                tempColor = colors[Math.round(rand(colors.length))];
              }
              resolve(tempColor);
            });
          }
          function makeStar() {
            // each particle calls this function - to randomize the colors
            let star = new Shape(-20, -20, 40, 40);
            star.graphics.f(shuffle(colors)[0]).dp(0, 0, 18, 6, rand(0.5, 0.8));
            return star.sca(0.5);
          }

          const emitter = new Emitter({
            startPaused: true,
            obj: new Circle(40, [black, gray, yellow]),
            gravity: 0,
            force: 10,
            interval: 30,
            decayTime: 500,
            life: 500,
            angle: 180,
          }).loc(player, null, stage, 0);

          const stars = new Emitter({
            obj: makeStar, // ZIM VEE value or PICK - lets you pass a function that will be evaluated later - with random colors
            random: { rotation: { min: 0, max: 360 } }, // start at random rotations for star
            num: 3, // send two at once
            life: 1000,
            decayTime: 1000,
            animation: {
              props: { rotation: [-360, 360] },
              ease: "linear",
              loop: true,
            }, // rotate one way or the other
            startPaused: true, // wait until the emitter is spurted when the ball contacts a pin
          });

          new Emitter({
            obj: new Rectangle(40, 40, [black, grey, dark]), // ZIM VEE value or PICK - lets you pass a function that will be evaluated later - with random colors
            random: { rotation: { min: 0, max: 360 } }, // start at random rotations for star
            num: 3, // send two at once
            life: 1000,
            decayTime: 1000,
            animation: {
              props: { rotation: [-360, 360] },
              ease: "linear",
              loop: true,
            }, // rotate one way or the other
            startPaused: true, // wait until the emitter is spurted when the ball contacts a pin
          });

          const controller = new MotionController({
            target: player,
            type: "mouse",
            container: world,
            rotate: true,
            speed: 10,
            boundary: new Boundary(0, 0, tile.width, tile.height),
          });
          controller.on("startmoving", function() {
            if (!paused) {
              emitter.pauseEmitter(false);
            }
          });
          controller.on("stopmoving", function() {
            emitter.pauseEmitter(true);
          });

          const speed = controller.speed;
          let snap = null;
          let mapCheck = false,
            purchaseTimeStart = false;

          function showMap() {
            if (mapCheck) return;
            mapCheck = true;
            pausePlayer();
            player.addTo(tile);
            tile.scaleTo(stage, 70, 70);
            snap = new Bitmap(world).center();
            tile.sca(1);
            player.addTo(world);
            world.visible = false;
            stage.update();
          }
          function purchaseTime() {
            if (purchaseTimeStart) return;
            pausePlayer();
            timer.stop();
            stage.update();
            window.document.dispatchEvent(
              new Event("showModal", { bubbles: true })
            );
          }
          function createPauseEvent() {
            // Listen for the event.
            window.document.addEventListener(
              "pause",
              function(e) {
                pausePlayer();
              },
              false
            );
          }
          function createContinueEvent() {
            window.document.addEventListener(
              "continue",
              function(e) {
                var timeAdded = JSON.parse(localStorage.getItem("time"));
                timer.time += timeAdded.time * 60; //@dev 60 seconds =1 minute
                continuePlay();
              },
              false
            );
          }
          function continuePlay() {
            controller.speed = speed;
            emitter.particles.alp(1);
            paused = false;
            timer.start();
            stage.update();
          }
          function pausePlayer() {
            controller.speed = 0;
            emitter.particles.alp(0);
            paused = true;
            timer.stop();
            stage.update();
          }
          function hideMap() {
            if (!mapCheck) return;
            mapCheck = false;
            continuePlay();
            world.visible = true;
            if (snap) snap.removeFrom();
            stage.update();
          }

          const timer = new Timer({
            time: currentLevelTime,
            borderColor: dark,
          }).pos(30, 30, LEFT);
          timer.on("complete", () => {
            timer.backing.color = red;
            timer.color = white;
            loose.show().mov(0, 170);
            stopRecording();
            stage.update();
          });
          console.log("timer: ", timer.time);
          var scorer = new Scorer({
            backgroundColor: yellow,
            score: total,
          }).pos(30, 30, RIGHT);

          var map = new Button({
            label: "MAP",
            backgroundColor: black,
            rollBackgroundColor: green,
            corner: 5,
            width: 100,
          })
            .sca(0.8)
            .pos(30, 30, LEFT, BOTTOM);
          map.on("mousedown", showMap);
          map.on("pressup", hideMap);
          stage.update();
          /**/
          var sablier = new Button({
            label: "Purchase Time",
            backgroundColor: black,
            rollBackgroundColor: green,
            corner: 5,
            width: 100,
          })
            .sca(0.8)
            .pos(30, 30, RIGHT, BOTTOM);
          sablier.on("mousedown", purchaseTime);
          stage.update();

          Ticker.add(function() {
            currentColor =
              currentColor === null || player.color === undefined
                ? player.color
                : currentColor;
            emitter.loc(player);
            if (timer.time <= 0) {
              loose.show().mov(0, 170);
              pausePlayer();
            }
            if (
              scorer.score <= 0 ||
              player.width <= 1.3 ||
              player.height <= 1.3
            ) {
              loose.show().mov(0, 170);
              timer.stop();
              pausePlayer();
            }
            emitter.angle = player.rotation + 180;
            tile.loop((dot) => {
              currentColor =
                currentColor === null || currentColor === undefined
                  ? player.color
                  : currentColor;

              if (player.color === currentColor && player.hitTestCircle(dot)) {
                if (dot.color === red || player.color !== dot.color) {
                  stars.loc(dot).spurt(100);
                  //timer.time -= timePenalty;
                  if (scorer.score <= 0) {
                    loose.show().mov(0, 170);
                    timer.stop();
                    pausePlayer();
                  }
                  player.width -= sizePenalty;
                  player.height -= sizePenalty;
                  dot.removeFrom();
                  changeColor();
                } else if (timer.time <= 0) {
                  loose.show().mov(0, 170);
                  pausePlayer();
                } else if (dot.color === currentColor) {
                  var collected = JSON.parse(
                    localStorage.getItem("colorsCollected")
                  );
                  console.log("collected: ", collected);
                  var nftType = Math.round(Math.random()) + 1; //@dev 1= time 2 normal
                  var nftsName = ["TimeNFT", "NFT"];
                  nftType =
                    nftsName[Math.round(Math.random() * nftsName.length)];
                  var types = collected.nfts.filter((nft) => {
                    return nft.name === nftType;
                  });
                  collected.collected.push(
                    types[Math.round(Math.random() * types.length)]
                  );
                  collected.nftAddresses.push(
                    BlockDotDifficulty.options.address
                  );
                  localStorage.setItem(
                    "colorsCollected",
                    JSON.stringify(collected)
                  );
                  changeColor();
                  stars.loc(dot).spurt(20);
                  scorer.score--;
                  dot.removeFrom();
                }
              }
            }, true); // loop backwards when removing
          });
          function calculateDeposit(delta, deposit) {
            var diff = deposit.minus(deposit.minus(deposit.mod(delta)));
            deposit = new bigNumber(deposit).minus(diff);
            console.log("deposit.toFixed(): ", deposit.toFixed());
            return deposit.toFixed();
          }
          async function submitScore() {
            showLoading();
            var collected = JSON.parse(localStorage.getItem("colorsCollected"));
            if (collected.collected.length === 0) {
              showAlert("No Collectables collected");
              hideLoading();
              window.location.href = "/server";
            } else {
              var score = 0;
              var nftIds = await Promise.resolve(transferNFT(collected));
              score = Math.round(score);

              var startDate = new bigNumber(
                new Date(
                  new Date().setHours(new Date().getHours() + 2)
                ).getTime()
              ).toFixed();
              var endDate = new bigNumber(
                new Date(
                  new Date().setDate(new Date().getDate() + 10)
                ).getTime()
              ).toFixed();
              startDate = Math.round(startDate / 1000);
              endDate = Math.round(endDate / 1000);
              var timeDelta = new bigNumber(endDate - startDate).toFixed();
              var deposit = calculateDeposit(
                timeDelta,
                new bigNumber(valuePerCollection).multipliedBy(
                  collected.collected.length
                )
              );
              Token.methods
                .approve(SablierContract.address, deposit)
                .send()
                .then((receipt, error) => {
                  if (receipt) {
                    SablierContract.methods
                      .createStream(
                        web3.eth.defaultAccount,
                        adminAddress,
                        deposit,
                        Token.address,
                        startDate,
                        endDate
                      )
                      .send()
                      .then((receipt, error) => {
                        if (receipt) {
                          hideLoading();
                          showSuccess("Successfully submitted scores");
                          window.location.href = "/server";
                        } else {
                          window.location.href = "/server";
                        }
                      })
                      .catch((error) => {
                        hideLoading();
                        console.log("SablierContract error: ", error);
                        //   window.location.href = "/server";
                      });
                  }
                })
                .catch((error) => {
                  hideLoading();
                  console.log("Token error: ", error);
                  // window.location.href = "/server";
                });
            }
          }
          /**
           * @dev probably not the best way to do this but meh
           * @param collectedNFTs The total number of collected NFTs
           * @returns NFT ids
           */
          async function transferNFT(collectedNFTs) {
            return new Promise(async (resolve) => {
              var tempNFTIds = [];
              collectedNFTs.collected.map(async (nft) => {
                console.log("value nft: ", nft);
                if (!nft) return;
                score += nft.value;
                console.log("score: ", score);
                nftIds.push(nft.id);
                tempNFTIds.push(BlockDotDifficulty.options.address);
                await BlockDotDifficulty.methods
                  .transferFrom(adminAddress, web3.eth.defaultAccount, nft.id)
                  .send({ gas: 6000000, from: adminAddress });
                await BlockDotDifficulty.methods
                  .addToMinted(nft.id)
                  .send({ gas: 6000000 });
                //@dev will do this once i figure out how to intergrate with game3.js
              });
              resolve(tempNFTIds);
            });
          }
          function showAlert(message) {
            Swal.fire("Alert", message, "warning");
          }
          function showSuccess(message) {
            Swal.fire("Success", message, "success");
          }
          function changeColor() {
            timeout(5000, function() {
              console.log("changing colors");
              currentColor = colors[Math.round(Math.random() * colors.length)];
              player.color = currentColor;
            });
          }
          const loose = new Pane(400, 150, black, yellow);
          new Button({
            width: 200,
            height: 50,
            corner: 0,
            backgroundColor: black,
            rollBackgroundColor: yellow,
            label: "Replay",
          })
            .center(loose)
            .tap(async () => {
              await submitScore();
            });
        }
        stage.update(); // this is needed to show any changes
      }
    }); // end of ready frame
  }
}); //@dev end of onReady EmbarkJS
