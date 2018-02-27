<link rel="import" href="../../bower_components/polymer/polymer-element.html">
<link rel="import" href="../../bower_components/paper-slider/paper-slider.html">
<link rel="import" href="../../bower_components/paper-button/paper-button.html">
<link rel="import" href="../../bower_components/paper-input/paper-textarea.html">
<link rel="import" href="../../bower_components/paper-dialog/paper-dialog.html">
<link rel="import" href="../../bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html">
<link rel="import" href="../../bower_components/paper-dialog-behavior/paper-dialog-behavior.html">
<link rel="import" href="../../bower_components/iron-selector/iron-selector.html">
<link rel="import" href="../../bower_components/paper-checkbox/paper-checkbox.html">
<link rel="import" href="../../bower_components/color-picker/color-picker.html">
<link rel="import" href="../../bower_components/color-picker/color-element.html">
<link rel="import" href="../../bower_components/iron-collapse-button/iron-collapse-button.html">
<link rel="import" href="../spog-eye/spog-eye.html">
<link rel="import" href="../spog-source/spog-source.html">


<!--
A COMPLETER AVEC  DANS LIB  : IMPORT / EXPORT, COMMANDES -->

<script src="../../bower_components/vis/dist/vis.min.js"></script>
<link rel="import" href="styles/vis-styles.html">
<link rel="import" href="styles/graphe-styles.html">
<link rel="import" href="../../bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html">

<script src="lib/commandes.js"></script>
<script src="lib/import-export.js"></script>

<dom-module id="spog-graphe">
  <template>
  <style include="graphe-styles"></style>
  <style include="vis-styles"></style>
  <style>
  #fabsetting {
    position: fixed;
    right: 25px;
    top: 100px;
  }
  #fabEye {
    position: fixed;
    right: 25px;
    top: 175px;
  }
  paper-button{background-color:#0D578B;color:white}
  </style>

  <div hidden$="{{eyehidden}}">
    <spog-eye id="eye" data="{{data}}" infered="{{infered}}"></spog-eye>
  </div>

  <paper-dialog id="popupTtl">
      <h3>Export ttl <paper-button ontap="_pageAide">?</paper-button><paper-button dialog-dismiss raised>X</paper-button></h3>

      <paper-input id="inputFileNameToSaveAs" label="Nom du fichier à sauvegarder (.ttl)"></paper-input>
      <paper-button raised on-tap="saveTextAsFile">Exporter le fichier Ttl</paper-button>
      <paper-dialog-scrollable>
        <paper-textarea id="inputTextToSave" rows="10"></paper-textarea>
      </paper-dialog-scrollable>
    </paper-dialog>



  <paper-dialog id="nodePopUp" backdrop transition="core-transition-bottom">

    <div horizontal start-justified start layout >

      <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
      <div style="padding-left:20px" vertical start-justified start layout wrap>

        <!--<h1 style="margin: 0;color: #0D578B;">SUCCESS!</h1>-->
        <h2 id="nodeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un noeud</h2>
        <p>
          <paper-input id="nodeLabel" label="Nom du noeud"></paper-input>
          <!-- checkbox style : https://codepen.io/sevilayha/pen/jCmgE -->
        </p>


        <iron-collapse-button>
          <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Forme</h3>
          <div slot="collapse-content">
            <fieldset>
              <legend>Forme</legend>
              <iron-selector id="shapeSelector" attr-for-selected="name" selected="{{selectedShape}}" selected-attribute="checked">
                <div>Label interne</div>
                <paper-checkbox name="ellipse">Ellipse</paper-checkbox>
                <paper-checkbox name="circle">Cercle</paper-checkbox>
                <paper-checkbox name="database">Database</paper-checkbox>
                <paper-checkbox name="box">Box</paper-checkbox>
                <paper-checkbox name="text">Texte</paper-checkbox>
                <hr>
                <div>Label externe</div>
                <paper-checkbox name="diamond">Diamant</paper-checkbox>
                <paper-checkbox name="star">Etoile</paper-checkbox>
                <paper-checkbox name="triangle">Triangle</paper-checkbox>
                <paper-checkbox name="triangleDown">Triangle inverse</paper-checkbox>
                <paper-checkbox name="square">Carré</paper-checkbox>
                <!--          <paper-checkbox name="image" disabled>Image</paper-checkbox>
                <paper-checkbox name="circularImage" disabled>Image Cercle</paper-checkbox>
                <paper-checkbox name="icon" disabled>Icone</paper-checkbox>-->
              </iron-selector>
            </fieldset>
          </div>
        </iron-collapse-button>

        <iron-collapse-button>
          <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Couleur</h3>
          <div slot="collapse-content">
            <fieldset>
              <legend>Couleur</legend>
              <color-picker  id="colorpicker" native value="{{colorValue}}" css-value="{{cssValue}}" alpha="{{alpha}}" position="right"></color-picker>
              <div class="horizontal-section-container result">
                <div><code>hex</code>: <b>[[colorValue]]</b></div>
                <div><code>alpha</code>: <b>[[alpha]]</b></div>
                <div><code>css-value</code>: <b>[[cssValue]]</b></div>
              </div>
            </fieldset>
          </div>
        </iron-collapse-button>


        <iron-collapse-button>
          <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Type</h3>
          <div slot="collapse-content">
            (developpements en cours)
            <fieldset>
              <legend>Type</legend>
              <iron-selector id="typeSelector" attr-for-selected="name" selected="{{selectedType}}" selected-attribute="checked">
                <paper-checkbox name="node">Node</paper-checkbox>
                <paper-checkbox name="url">Url</paper-checkbox>
                <paper-checkbox name="graph">Graphe</paper-checkbox>
                <paper-checkbox name="source">Source</paper-checkbox>
              </iron-selector>
            </fieldset>
          </div>
        </iron-collapse-button>

        <div style="padding-top:10px" horizontal end-justified layout self-stretch>
          <paper-button id="nodeSaveButton" raised>ok</paper-button>
          <paper-button id="nodeCancelButton" raised>Annuler</paper-button>
        </div>
      </div>
    </div>
  </paper-dialog>


  <paper-dialog id="edgePopUp" backdrop transition="core-transition-bottom">
    <div horizontal start-justified start layout >
      <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
      <div style="padding-left:20px" vertical start-justified start layout wrap>
        <h2 id="edgeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un lien</h2>
        <p >  <paper-input id="edgeLabel" label="Nom du lien"></paper-input></p>
        <div style="padding-top:10px" horizontal end-justified layout self-stretch>
          <paper-button id="edgeSaveButton" raised>ok</paper-button>
          <paper-button id="edgeCancelButton" raised>Annuler</paper-button>
        </div>
      </div>
    </div>
  </paper-dialog>

  <paper-dialog id="importPopUp" backdrop transition="core-transition-bottom">
    <div horizontal start-justified start layout >
      <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
      <div style="padding-left:20px" vertical start-justified start layout wrap>
        <h2 id="edgeOperation" style="margin: 0;color: #0D578B;">Import JSON</h2>
        <p >
          <fieldset>
            <legend>Paramètres</legend>
            <paper-checkbox id="remplaceNetwork">Remplacer Network</paper-checkbox>
            <paper-checkbox id="partageImport" disabled >Partager Import</paper-checkbox>
          </fieldset>
        </p>
        <p>
          <fieldset>
            <legend>Fichier</legend>
            <input id="filepicker" type="file" multiple value="Importer"></input>
          </fieldset>
        </p>
        <div style="padding-top:10px" horizontal end-justified layout self-stretch>
          <paper-button id="importCancelButton" on-tap="_closeImportPopUp" raised>Annuler</paper-button>
        </div>
      </div>
    </div>
  </paper-dialog>


  <div id="settings" hidden$="{{settinghidden}}">
    <div>  <!--AJOUTER LE CHANGEMENT DE PHYSICS -->
      Gravité   <paper-slider  min="0" max="0.01" value="{{gravityValue}}" step="0.001" on-change="_changeGravity" ></paper-slider>
      Longueur des liens     <paper-slider  min="10" max="800" value="{{springLengthValue}}"  on-change="_changeSpringLength"></paper-slider>
      Force des liens   <paper-slider  min="0" max="0.2" value="{{springConstantValue}}"  step="0.001" on-change="_changeSpringConstant"></paper-slider>
      Distance entre deux noeuds     <paper-slider  min="10" max="800" value="{{nodeDistanceValue}}"  on-change="_changeNodeDistance"></paper-slider>
      Souplesse           <paper-slider  min="0.01" max="2" value="{{dampingValue}}"  step="0.01" on-change="_changeDamping"></paper-slider>
      <paper-button raised  on-tap="_defaultPhysicValues">Defaut</paper-button>
      <br><br>
    </div>
    <div>
      <!--<spog-source></spog-source>-->
    </div>
  </div>
  <div id="mynetwork"></div>
  <paper-fab id="fabsetting" on-tap="_toggleSettings"  label="set"></paper-fab>
  <paper-fab id="fabEye" on-tap="_toggleEye"  label="Eye"></paper-fab>
  <input id="inputMessage" class="inputMessage" on-change="traiteMessage" placeholder="Tapez votre triplet ici, précédé de '::' ou une commande : '/e' pour exporter, '/t' pour exporter au format .ttl, '/i' pour importer" />
</template>

<script>
/**
* `spog-graphe`
*
*
* @customElement
* @polymer
* @demo demo/index.html
*/
class SpogGraphe extends Polymer.Element {
  static get is() { return 'spog-graphe'; }
  static get properties() {
    return {
      actionstosend: {
        type: Array,
        value: [],
        notify: true
      },
      socket: {
        type: Object,
        observer: "_socketChanged"
      },
      tickDelay: {
        type: Number,
        value: 100         // 15ms selon source, tempo pour envoi du snapshot par le serveur
      },
      db2populate:{
        type: Array,
        value: []
      },
      gravityValue :{
        type : Number,
        value: 0.001
      },
      springLengthValue :{
        type : Number,
        value: 220
      },
      springConstantValue :{
        type : Number,
        value: 0.05
      },
      nodeDistanceValue :{
        type : Number,
        value: 400
      },
      dampingValue :{
        type : Number,
        value: 0.08
      },
      fusekiresults: {
        type: Array,
        observer: '_fusekiresultsChanged'
      },
      settinghidden:{
        type: Boolean,
        value: true
      },
      eyehidden:{
        type: Boolean,
        value: true
      },
      infered:{
        type: Array,
        value:[],
        observer: '_inferedChanged'
      },
      value: {
        type: String,
        value: "rgb(173,208,255)"
      } ,
      selectedShape: {
        type: String,
        value: "ellipse"
      },
      selectedType: {
        type: String,
        value: "node"
      }
      /*  nodes:{
      type: Array,
      notify: true
    },
    edges:{
    type: Array,
    notify: true
  },
  network:{
  notify: true
},
data:{
type: Object,
notify: true,
computed: '_networkDataChanged(network.body.data)'
},*/
};
}

/*
networkDataChanged(){
console.log(this.network.body.data.nodes);
console.log(this.network.body.data.edges);
this.set('nodes', this.network.body.data.nodes);
this.set('edges', this.network.body.data.edges);
}*/



ready() {
  super.ready();
  this.colorValue = "rgb(173,208,255)";
  this.selectedShape = "ellipse";
  this.selectedType = "node";

  this.network = this.networkDivInitialize(this.$.mynetwork, this);
  // When possible, use afterNextRender to defer non-critical    // work until after first paint.
  /*Polymer.RenderStatus.afterNextRender(this, function() {
  //  console.log(this.network);
  //  this.network.fit();
  this.network.moveTo(this.network.body.data.nodes.get(1));
});*/
var app = this;
app.tickInterval = setInterval(function() {
  if ((app.db2populate.length > 0) && (app.network != undefined)) {
    console.log(app.db2populate.length );
    //  console.log(app.network);
    app.populateVis(app.db2populate, app.network);
    //log(app.db2populate.length + "/" + app.tiplets2popLength);
    app.network.fit();
  }

  //if (app.data != app.network.body.data){
  app.data = [];
  app.data = app.network.body.data;
  //console.log(app.data);
  //}
}, app.tickDelay);
var network = this.network;
this.network.on("selectNode", function(params) {
  console.log("select");
  console.log(params);
  if (params.nodes.length == 1) {

    if (network.isCluster(params.nodes[0]) == true) {
      network.openCluster(params.nodes[0]);
    }else if (params.nodes[0] == 7) {
      app._toggleDesc();
    }else {
      var node = network.body.data.nodes.get(params.nodes[0]);
      console.log(node);
      /*  if (node.type == "graph" ){
      console.log(node.name);
      app.socket.emit("changeGraph", node.name);
    }*/
  }
}
});
this._toggleDesc();
console.log(this.network);
/*
this.nodes = [];
this.nodes = this.network.body.data.nodes;
this.edges = [];
this.edges = this.network.body.data.edges;*/

}

traiteMessage(){
  var message = this.$.inputMessage.value;
  console.log(message);
  if (message.startsWith("::")){
    this.catchTriplet(message, this.network);
    this.$.inputMessage.value = "::";
  }else if (message.startsWith("/")){
    var retourCommande = catchCommande(message,this.network,this);
    // implementer les commandes import, export, connexion endpoint...


  }
}

catchTriplet(message, network){

  console.log(message.length);
  message=message.trim();
  var tripletString = message.substring(2).trim().split(" ");
  // les noeuds existent-ils ?
  var sujetNode = network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == tripletString[0] );
    }
  });
  var objetNode = network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == tripletString[2]);
    }
  });
  console.log(sujetNode);
  console.log(objetNode);
  // sinon, on les créé
  if (sujetNode.length == 0){
    network.body.data.nodes.add({label: tripletString[0] });
  }
  if (objetNode.length == 0){
    network.body.data.nodes.add({ label: tripletString[2] });
  }
  // maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
  sujetNode = network.body.data.nodes.get({
    filter: function(node){
      console.log(node);
      return (node.label == tripletString[0] );
    }
  });
  objetNode = network.body.data.nodes.get({
    filter: function(node){
      console.log(node);
      return (node.label == tripletString[2]);
    }
  });
  var actionSujet = {};
  actionSujet.type = "newNode";
  actionSujet.data = sujetNode[0];
  //  actionsToSendTemp.push(actionSujet);
  this.addAction(actionSujet);
  var actionObjet = {};
  actionObjet.type = "newNode";
  actionObjet.data = objetNode[0];
  //  actionsToSendTemp.push(actionObjet);
  this.addAction(actionObjet);
  // maintenant, on peut ajouter l'edge
  network.body.data.edges.add({
    label: tripletString[1],
    from : sujetNode[0].id,
    to : objetNode[0].id
  });

  //on récupère ce edge pour l'envoyer au serveur
  var edge = network.body.data.edges.get({
    filter: function(edge) {
      return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == tripletString[1]);
    }
  });
  var actionEdge = {};
  actionEdge.type = "newEdge";
  actionEdge.data = edge;
  this.addAction(actionEdge);
  //  actionsToSendTemp.push(actionEdge);
  //console.log(actionsToSendTemp);
  //  return actionsToSendTemp;

}

_socketChanged(s){
  console.log(s);
  var app = this;
  this.socket.on('tick', function(data){
    console.log(data);
    if (data.actions.length>0){
      data.actions.forEach(function(action) {
        //    console.log(action);
        switch(action.type) {
          case "newNode":
          if(app.network != undefined){
            app.addNodeIfNotExist(app.network, action.data);
          }
          break;
          case "editNode":
          break;
          case "deleteNode":
          app.deleteFromServer(action.data);
          break;
          case "newEdge":
          if(app.network != undefined){
            app.addEdgeIfNotExist(app.network, action.data);
          }
          break;
          case "editEdge":
          break;
          case "deleteEdge":
          app.deleteFromServer(action.data);
          break;
          default:
          console.log("action non reconnue");
          console.log(action);
        }
      });
    }
  });


  this.socket.on('initDb', function(db){
    console.log(db);
    app.db2populate = db;
    app.populateVis(app.db2populate, app.network);
    app.triplets2popLength = app.db2populate.length;
  });

  this.socket.on('initFuz', function(initFuz){
    console.log(initFuz);
  })

  /*
  app.data = [];
  app.data = app.network.body.data;
  console.log(app.data);*/

}

_fusekiresultsChanged(fusekiTriplets, oldValue){
  console.log(fusekiTriplets);
  console.log(this.network);
  var groupe = this.network.groups.groups.length+1;

  if(fusekiTriplets.length > 0){
    for (var i = 0; i < fusekiTriplets.length; i++) {
      var triplet = fusekiTriplets.pop();
      console.log(triplet);
      var sujetTemp = this.splitDecompose(triplet.Sujet);
      var proprieteTemp = this.splitDecompose(triplet.Predicat);
      var objetTemp = this.splitDecompose(triplet.Objet);
      //  console.log(sujetTemp);
      var sujetExist = this.network.body.data.nodes.get(sujetTemp.uri) || this.network.body.data.nodes.get({
        filter: function(node){
          return (node.label == sujetTemp.localName );
        }
      });
      var objetExist = this.network.body.data.nodes.get(objetTemp.uri)|| this.network.body.data.nodes.get({
        filter: function(node){
          return (node.label == objetTemp.localName );
        }
      });
      if (sujetExist == null || sujetExist.length == 0) {
        console.log("creation sujet");
        if (sujetTemp.localName.length > 40) {
          this.network.body.data.nodes.add({
            id: sujetTemp.uri,
            label: sujetTemp.localName.match(/.{1,40}/g).join("\n"),
            //shape: "box",
            group: groupe
          });
        } else {
          var node = {
            id: sujetTemp.uri,
            label: sujetTemp.localName,
            group: groupe,
          };
          this.network.body.data.nodes.add(node);
        }
      }else{
        console.log("SUJET EXIST");
      }
      if (objetExist == null || objetExist.length == 0) {
        console.log("creation Objet ");
        if (objetTemp.localName.length > 40) {
          this.network.body.data.nodes.add({
            id: objetTemp.uri,
            label: objetTemp.localName.match(/.{1,40}/g).join("\n"),
            //  shape: "box",
            group: 0
          });
        } else {
          var node = {
            id: objetTemp.uri,
            label: objetTemp.localName,
            group: 0,
          };
          this.network.body.data.nodes.add(node);
        }
      }else{
        console.log("Objet EXIST");

        //    objetTemp = objetExist; //pkoi pas objetExist[0] ? objetExist retourne un objet alors que sujetExist un Array ???
      }



      // on recupere les noeuds, une fois qu'on est certain qu'ils sont créés
      var sujet = this.network.body.data.nodes.get(sujetTemp.uri) || this.network.body.data.nodes.get({
        filter: function(node){
          //    console.log(node);
          return (node.id == sujetTemp.id || node.label == sujetTemp.localName );
        }
      });
      var  objet = this.network.body.data.nodes.get(objetTemp.uri)|| this.network.body.data.nodes.get({
        filter: function(node){
          //    console.log(node);
          return (node.id == sujetTemp.id || node.label == objetTemp.localName );
        }
      });

      if(Array.isArray(sujet)){
        sujet = sujet[0];
      }

      if(Array.isArray(objet)){
        objet = objet[0];
      }
      console.log(sujet);
      console.log(objet);
      //  var edgeExist = [];
      // tester s'il exist dejà un lien identique entre les deux noeuds avec label
      //  edgeExist = this.network.body.data.edges.get(triplet.subject);
      //  if (edgeExist == null || edgeExist.length == 0) {
      var edge = {
        //  id: "",
        from: sujet.id,
        to: objet.id,
        label: proprieteTemp.localName,
        arrows: "to"
      };
      //edge.id = proprieteTemp.subject;
      //  edge[triplet.predicate] = triplet.object;
      this.network.body.data.edges.add(edge);

      console.log("»»»»»»»»»»»»»»»»»»»»»»»x");
      console.log(sujet);
      console.log(sujet.id+" >>- "+sujet.label);
      console.log(objet);
      console.log(objet.id+" --> "+objet.label);
      console.log(edge);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      //  } /*else {
      //  var edge = edgeExist;
      //    edge[triplet.predicate] = triplet.object;
      //    network.body.data.edges.update(edge);
      //  }*/
    }
  }

}

splitDecompose(binding){
  var binding = binding;
  var result = {};
  var type = binding.type;
  var prefix = binding.value.split("#")[0];
  var localName =  binding.value.split("#")[1];
  if (localName == undefined){
    prefix = binding.value.substring(0, binding.value.lastIndexOf("/") + 1);
    localName = binding.value.substring(binding.value.lastIndexOf("/") + 1, binding.value.length);
  }else{
    prefix = prefix+"#";
  }
  result.uri = binding.value;
  result.type = type;
  result.prefix= prefix;
  result.localName = localName;
  return result;
}

populateFromInfered(infered, network){
  if(network != undefined){
    console.log(infered);
    if(infered.length != 0){
      infered.forEach(function(triplet){
        //var triplet = infered.pop();
        console.log(triplet);
        if (triplet != undefined) {
          console.log(infered.length);
          var sujet = triplet[0].trim();
          var propriete = triplet[1].trim();
          var objet = triplet[2].trim();
          var sujetExist = network.body.data.nodes.get({
            filter: function(node){
              //    console.log(node);
              return (node.label == sujet );
            }
          });
          var objetExist = network.body.data.nodes.get({
            filter: function(node){
              //    console.log(node);
              return (node.label == objet );
            }
          });
          if(sujetExist == null  || sujetExist.length == 0){
            console.log("creation "+sujet);
            var node = {
              label: sujet,
              group: 100, // règles
              borderWidth: 2,
              shape: "diamond",
              color: "rgb(255,153,30)"
            };
            network.body.data.nodes.add(node);
          }else{
            console.log(sujet+ " exist");
            console.log(sujetExist);
            //  network.body.data.nodes.update({id: sujetExist[0].id, group: 1,borderWidth: 2,shape: "diamond"});

          }
          if(objetExist == null  || objetExist.length == 0){
            console.log("creation "+objet);
            var node = {
              label: objet,
              group: 100,
              borderWidth: 2,
              shape: "diamond",
              color: "rgb(255,153,30)"
            };
            network.body.data.nodes.add(node);
          }else{
            console.log(objet+ " exist");
            console.log(objetExist);
            //  network.body.data.nodes.update({id: sujetExist[0].id, group: 1,borderWidth: 2,shape: "diamond"});

          }


          sujetExist = network.body.data.nodes.get({
            filter: function(node){
              //    console.log(node);
              return (node.label == sujet );
            }
          });
          objetExist = network.body.data.nodes.get({
            filter: function(node){
              //    console.log(node);
              return (node.label == objet );
            }
          });
          var edgeExist = network.body.data.edges.get({
            filter: function(edge) {
              return (edge.from == sujetExist[0].id && edge.to == objetExist[0].id && edge.label == propriete);
            }
          });

          if (edgeExist == null || edgeExist.length == 0) {
            var edge = {
              from: sujetExist[0].id,
              to: objetExist[0].id,
              label: propriete,
              group: 100, // règles
              arrows: "to",
              color: "rgb(255,153,30)"
            };
            //edge.id = triplet.subject;
            //edge[triplet.predicate] = triplet.object;
            console.log("add");
            console.log(edge);
            network.body.data.edges.add(edge);
          } else {
            console.log("update");
            console.log(edgeExist);
            //var edge = edgeExist;
            //edge[triplet.predicate] = triplet.object;
            //  network.body.data.edges.update(edge);
          }

        }
      });
    }
    else{
      console.log("suppression des inférences");

      var edgesInferres = network.body.data.edges.get({
        filter: function(edge){
          //    console.log(node);
          return (edge.group == 100 );
        }
      });
      console.log(edgesInferres);
      network.body.data.edges.remove(edgesInferres);

      var nodesInferres = network.body.data.nodes.get({
        filter: function(node){
          //    console.log(node);
          return (node.group == 100 );
        }
      });
      console.log(nodesInferres);
      network.body.data.nodes.remove(nodesInferres);

    }
  }
}

populateVis(db, network) {
  console.log("POPULATE");
  if (db.length > 0) {
    if (db.length % 100 < 5) {
      /*
      Rezoom tous les 100*/
      network.fit();
      network.redraw();
    }
    for (var i = 0; i < 10; i++) {
      var triplet = db.pop();
      if (triplet != undefined) {
        console.log(triplet);
        if ((triplet.type == "node" || triplet.type == "url" || triplet.type == "graph" || triplet.type == "source") && triplet.predicate == "label") {
          var noeudExist = network.body.data.nodes.get(triplet.subject);
          if (noeudExist == null || noeudExist.length == 0) {
            if (triplet.object.length > 40) {
              network.body.data.nodes.add({
                id: triplet.subject,
                label: triplet.object.match(/.{1,40}/g).join("\n"),
                //  shape: "box",
                group: 0
              });
            } else {
              var node = {
                id: triplet.subject,
                label: triplet.object,
                type: triplet.type,
                group: 0,
              };
              network.body.data.nodes.add(node);
              if ((node.label.toLowerCase() == "depart") || (node.label.toLowerCase() == "départ")) {
                //  console.log('trouve depart');
                //var nodeDep = network.body.data.nodes.get(triplet.subject);
                //console.log(nodeDep);
                //nodeDep.color = {background:'pink', border:'purple'};
                network.body.data.nodes.update({
                  id: triplet.subject,
                  color: {
                    background: 'pink',
                    border: 'purple'
                  }
                })
                var nodeDep = network.body.data.nodes.get(triplet.subject);
                /*nodeDep = network.body.data.nodes.get(triplet.subject);*/
                network.focus(nodeDep.id);
                network.fit();
              }
              /*  if (node.label.match(/^\d/)) {
              // Return true if starts with number
              console.log(node.label);
              // first number
              var firstNum = node.label.split(".")[0];
              network.body.data.nodes.update({
              id: triplet.subject,
              group: firstNum
            });
          }*/

        }
      } else {
        //    console.log("exist : ");
        /*            console.log(noeudExist);
        noeudExist.mass++;
        console.log(noeudExist);*/
        //    console.log(triplet);
        network.body.data.nodes.update({
          id: triplet.subject,
          label: triplet.object,
          type: triplet.type,
        })
      }
    } else if (triplet.type == "shape") {
      console.log(triplet);
      network.body.data.nodes.update({
        id: triplet.subject,
        shape: triplet.object
      })
    }
    else if (triplet.type == "color") {
      console.log(triplet);
      network.body.data.nodes.update({
        id: triplet.subject,
        color: triplet.object
      })
    }       else {
      var edgeExist = [];
      edgeExist = network.body.data.edges.get(triplet.subject);
      if (edgeExist == null || edgeExist.length == 0) {
        var edge = {
          id: "",
          from: "",
          to: "",
          label: "",
          arrows: "to"
        };
        edge.id = triplet.subject;
        edge[triplet.predicate] = triplet.object;
        network.body.data.edges.add(edge);
      } else {
        var edge = edgeExist;
        edge[triplet.predicate] = triplet.object;
        network.body.data.edges.update(edge);
      }
    }
  } else {
    console.log("import terminé")
    //  network.focus(nodeDep);
    clearInterval(this.tickInterval);
    var app = this;
    this.tickInterval = setInterval(function() {
      app.data = [];
      app.data = app.network.body.data;
    }, 2000);
  }
}
}
}


//////////////////////////////////////////////////////////////////
networkDivInitialize(container, graphe){
  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: "node1", label: 'Spoggy', color: 'rgb(195,238,0)'},
    {id: "node2", label: 'WebApp', color: 'rgba(97,238,195,0.5)'},
    {id: "node3", label: 'David'},
    {id: "node4", label: 'Bob'},
    {id: "node5", label: 'Graph', color: 'rgba(195,238,97,0.5)', cid:2},
    {id: "node6", label: 'Spoggy est une application multiutilisateurs\n permettant la création de graphes de connaissance.\n Cliquez sur le bouton Edit\n pour ajouter / modifier un noeud ou un lien.', color: 'rgba(238,97,195,0.5)', shape: 'box', cid:1},
    {id: "node7", label: 'Description', color: 'rgba(238,97,195,0.5)', cid:1},
    {id: "node8", label: 'Un graphe est un ensemble de noeuds\n et de liens entre ces noeuds.', color: 'rgba(238,97,195,0.5)', shape: 'box', cid:1},
    {id: "node9", label: 'graph0', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph0'},
    {id: "node10", label: 'graph1', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph1'},
    {id: "node11", label: 'graph2', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph2'},
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: "node1", to: "node2", label: "type", array:"to"},
    {from: "node1", to: "node3", label: "developpeur", array:"to"},
    {from: "node3", to: "node4", label: "connait", array:"to"},
    {from: "node1", to: "node5", label: "hasPart", array:"to"},
    {from: "node1", to: "node6", label: "description", array:"to"},
    {from: "node6", to: "node7", label: "type", array:"to"},
    {from: "node5", to: "node8", label: "description", array:"to"},
    {from: "node8", to: "node7", label: "type", array:"to"},
    {from: "node9", to: "node5", label: "type", array:"to"},
    {from: "node10", to: "node5", label: "type", array:"to"},
    {from: "node11", to: "node5", label: "type", array:"to"},
    {from: "node1", to: "node9", label: "first", array:"to"},

  ]);
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    edges:{
      arrows: {
        to:     {enabled: true, scaleFactor:1, type:'arrow'},
        middle: {enabled: false, scaleFactor:1, type:'arrow'},
        from:   {enabled: false, scaleFactor:1, type:'arrow'}
      }},

      interaction:{
        navigationButtons: true,
        //  keyboard: true  //incompatible avec rappel de commande en cours d'implémentation
      },
      manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          data.label = "";
          //  console.log(this);
          graphe.editNode(data, callback);
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          //document.getElementById('nodeOperation').innerHTML = "Edit Node";
          graphe.$.nodeOperation.innerHTML = "Edit Node";
          graphe.editNode(data, callback);
        },
        deleteNode: function (data, callback) {
          // filling in the popup DOM elements
          graphe.deleteNode(data, callback);
        },
        addEdge: function (data, callback) {
          if (data.from == data.to) {
            var r = confirm("Êtes-vous certain de vouloir connecter le noeud à lui-même?");
            if (r != true) {
              callback(null);
              return;
            }
          }
          //document.getElementById('edgeOperation').innerHTML = "Add Edge";
          graphe.$.edgeOperation.innerHTML = "Add Edge";
          graphe.editEdgeWithoutDrag(data, callback);
        },
        editEdge: {
          editWithoutDrag: function(data, callback) {
            //document.getElementById('edgeOperation').innerHTML = "Edit Edge";
            graphe.$.edgeOperation.innerHTML = "Edit Edge";
            graphe.editEdgeWithoutDrag(data,callback);
          }
        },
        deleteEdge: function(data,callback){
          graphe.deleteEdge(data,callback);
        }
      },
      physics:{
        enabled: true,
        barnesHut: {
          gravitationalConstant: -1,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 1
        },
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springConstant: 0.08,
          springLength: 100,
          damping: 0.4,
          avoidOverlap: 0
        },
        repulsion: {
          centralGravity: 0.001, //0.001 ? A quoi sert cette valeur ?
          springLength: 220, //220 (//200 //300)
          springConstant: 0.01, //0.01
          nodeDistance: 150, //100 //350
          damping: 0.08
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09
        },
        maxVelocity: 500, //50
        minVelocity: 1, //0.1
        solver: 'repulsion',
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 100,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true
      }
    };

    return new vis.Network(container, data, options);
  }

  editNode (data, callback) {
    console.log(data);
    this.$.nodeLabel.value= data.label || "";
    this.selectedShape = data.shape || "ellipse";
    this.selectedType = data.type || "node";
    //console.log(typeof data.color.background);
    //  if(data.color != undefined){
    this.cssValue = data.color || "rgb(173,208,255)";
    //  }else{
    //    this.colorValue = "rgb(173,208,255)";
    //  this.cssValue = "rgb(173,208,255)";
    //  }

    this.$.nodeSaveButton.onclick = this.saveNodeData.bind(this, data, callback);
    //  this.$.nodeLabel.onchange = this.saveNodeData.bind(this, data, callback);
    this.$.nodeCancelButton.onclick = this.clearNodePopUp.bind(this);
    this.$.nodePopUp.style.display = 'block';
    this.$.nodeLabel.focus();
  }

  clearNodePopUp () {
    this.$.nodeSaveButton.onclick = null;
    this.$.nodeCancelButton.onclick = null;
    this.$.nodePopUp.style.display = 'none';
  }

  cancelNodeEdit (callback) {
    this.clearNodePopUp(this);
    callback(null);
  }

  saveNodeData (data, callback) {
    //  console.log(this.selectedShape);
    //  console.log(this.cssValue);
    data.label = this.$.nodeLabel.value;
    data.shape = this.selectedShape;
    data.color = this.cssValue;
    data.type = this.selectedType;

    if (data.label.length > 40){
      var titleTemp =data.label.match(/.{1,40}/g);
      //  console.log(titleTemp);
      data.label = titleTemp.join("\n");
      //  data.shape = "box";
      //  data.mass = 1/data.label.length
    }
    this.clearNodePopUp(this);
    callback(data);
    var node = this.network.body.data.nodes.get(data.id);
    console.log(node);
    var action = {};
    action.type = "newNode";
    action.data = node;
    this.addAction(action);
    /*this.nodes = [];
    this.nodes = this.network.body.data.nodes;*/
  }

  addAction(action){
    //  var actionstosendTemp = catchTriplet(message, network, actionstosend);
    //  var actionstosendTemp = catchTriplet(message, network);
    var actionstosendTemp = this.actionstosend;
    this.actionstosend = [];
    actionstosendTemp.push(action);
    this.actionstosend = actionstosendTemp;
    //  console.log(this.actionstosend);
    /*if ((actionstosendTemp != undefined) && (actionstosendTemp.length > 0)) {
    actionstosend = actionstosend.concat(actionstosendTemp);
    console.log("send");
    console.log(actionstosend);
  }*/
  /*
  this.nodes = [];
  this.nodes = this.network.body.data.nodes;
  this.edges = [];
  this.edges = this.network.body.data.edges;*/
}

editEdgeWithoutDrag (data, callback) {
  this.$.edgeLabel.value = data.label || "";
  this.$.edgeSaveButton.onclick = this.saveEdgeData.bind(this, data, callback);
  this.$.edgeLabel.onchange = this.saveEdgeData.bind(this, data, callback);
  this.$.edgeCancelButton.onclick = this.cancelEdgeEdit.bind(this,callback);
  this.$.edgePopUp.style.display = 'block';
  this.$.edgeLabel.focus();
}

clearEdgePopUp () {
  this.$.edgeSaveButton.onclick = null;
  this.$.edgeCancelButton.onclick = null;
  this.$.edgePopUp.style.display = 'none';
}

cancelEdgeEdit (callback) {
  this.clearEdgePopUp();
  callback(null);
}

saveEdgeData (data, callback) {
  if (typeof data.to === 'object')
  data.to = data.to.id
  if (typeof data.from === 'object')
  data.from = data.from.id
  data.label = this.$.edgeLabel.value;
  this.clearEdgePopUp();
  callback(data);
  var edge = this.network.body.data.edges.get({
    filter: function(edge) {
      return (edge.from == data.from && edge.to == data.to && edge.label == data.label);
    }
  });
  var action = {};
  action.type = "newEdge";
  action.data = edge;
  this.addAction(action);
  /*  this.edges = [];
  this.edges = this.network.body.data.edges;*/
}


deleteNode (data, callback){
  //console.log(data);
  var action = {};
  action.type = "deleteNode";
  action.data = data;
  this.addAction(action);
  callback(data);
}

deleteEdge (data, callback){
  //console.log(data);
  var action = {};
  action.type = "deleteEdge";
  action.data = data;
  this.addAction(action);
  callback(data);
}
/*A RAJOUTER
document.getElementById("importCancelButton").onclick = function (){
document.getElementById('importPopUp').style.display = 'none';
}*/

/*
document.getElementById("toggleMessagesDiv").onclick = function (){
document.getElementById('chatArea').style.height = '30px';
}*/




addEdgeIfNotExist (network, data){
  var existEdge = false;
  try {
    existEdge = this.network.body.data.edges.get({
      filter: function(edge){
        return (edge.id == data[0].id);
      }
    });
    if (existEdge.length == 0){
      this.network.body.data.edges.add(data[0]);
    }else{
      //s'il existe déjà, ne serait-ce pas un renommage ?
      //  console.log("renomme");
      //  console.log(data);
      //existNode[0].label = data.label;
      //  editNode(data, null);
      //    console.log(this.network.body.data.edges);
      this.network.body.data.edges.update({id: data[0].id, label: data[0].label});
      //  console.log(this.network.body.data.edges);
    }
  }
  catch (err) {
    console.log(err);
  }
}

addNodeIfNotExist(network, data){
  var existNode = false;
  //  console.log(data);
  try{
    existNode = this.network.body.data.nodes.get({
      filter: function(node){
        //    console.log(node);
        return (node.id == data.id );
      }
    });
    //  console.log(existNode);
    if (existNode.length == 0){
      this.network.body.data.nodes.add(data);
    }else{
      //s'il existe déjà, ne serait-ce pas un renommage ?
      //  console.log("renomme");
      //  console.log(data);
      //existNode[0].label = data.label;
      //  editNode(data, null);
      //  console.log(this.network.body.data.nodes);
      this.network.body.data.nodes.update(data);
    }
  }
  catch (err){
    console.log(err);
  }
  /*  this.nodes = [];
  this.nodes = this.network.body.data.nodes;*/
}

deleteFromServer (data){
  //Pour suppression, on recupere le noeud et ses liens envoyés par le serveur
  this.network.body.data.nodes.remove(data.nodes);
  this.network.body.data.edges.remove(data.edges);
}

_changeGravity(e){
  this.network.physics.options.repulsion.centralGravity = this.gravityValue;
}

_changeSpringLength(){
  this.network.physics.options.repulsion.springLength = this.springLengthValue;
}

_changeSpringConstant(){
  this.network.physics.options.repulsion.springConstant = this.springConstantValue;
}

_changeNodeDistance(){
  this.network.physics.options.repulsion.nodeDistance = this.nodeDistanceValue;
}

_changeDamping(){
  this.network.physics.options.repulsion.damping = this.dampingValue;
}

_defaultPhysicValues(){
  /*valeurs par Defaut de network.physics.repulsion
  centralGravity: 0.001,
  springLength: 220, //200 //300
  springConstant: 0.005,
  nodeDistance: 180, //100 //350
  damping: 0.08*/
  this.gravityValue = 0.001;
  this.network.physics.options.repulsion.centralGravity = this.gravityValue;
  this.springLengthValue = 200;
  this.network.physics.options.repulsion.springLength = this.springLengthValue;
  this.springConstantValue = 0.01;
  this.network.physics.options.repulsion.springConstant = this.springConstantValue;
  this.nodeDistanceValue = 150;
  this.network.physics.options.repulsion.nodeDistance = this.nodeDistanceValue;
  this.dampingValue = 0.08;
  this.network.physics.options.repulsion.damping = this.dampingValue;
}

_inferedChanged(newInfered,oldinfered){
  console.log("INFERED");
  console.log(newInfered);
  this.populateFromInfered(newInfered, this.network)
}

_toggleSettings(){
  console.log(this.$.settings.hidden);
  //this.$.settings.hidden= !this.$.settings.hidden;
  this.settinghidden = !this.settinghidden;
}
_toggleEye(){
  console.log(this.$.eye.hidden);
  //this.$.eye.hidden= !this.$.eye.hidden;
  this.eyehidden = !this.eyehidden;
}


// CLUSTERS
_toggleDesc() {
  //  network.setData(data);
  var clusterOptionsByData = {
    joinCondition:function(childOptions) {
      return childOptions.cid == 1;
    },
    processProperties: function (clusterOptions, childNodes) {

      //clusterIndex = clusterIndex + 1;
      var clusterIndex = 1
      var childrenCount = 0;
      for (var i = 0; i < childNodes.length; i++) {
        childrenCount += childNodes[i].childrenCount || 1;
      }
      clusterOptions.childrenCount = childrenCount;
      clusterOptions.label = "Description\n# " + childrenCount + "";
      // clusterOptions.font = {size: childrenCount*5+30}
      clusterOptions.id = 'cluster:' + clusterIndex;
      clusterOptions.mass = 1/childrenCount;
      // clusters.push({id:'cluster:' + clusterIndex, scale:scale});
      return clusterOptions;
    },
    clusterNodeProperties: {id:'cidCluster',  color: 'rgba(97,238,195,0.5)', borderWidth:3, shape:'box'}
  };
  this.network.cluster(clusterOptionsByData);
}

_closeImportPopUp(){
  this.$.importPopUp.style.display = 'none';
}

_toogle() {
  console.log("clic");
  this.$.nodePopUp.toggle();
}

saveTextAsFile(){
  var textToWrite="";
  var fileNameToSaveAs="";
  var textFileAsBlob="";
  var extension="ttl";
  var nomFichier="";
var data = this.$.inputTextToSave.value;
  console.log(data);

  if((typeof data != "undefined")&& (data.length>0)){
    textToWrite=data;
  }else{

    textToWrite = this.$.inputTextToSave.value;    //textToWrite = document.getElementById("inputTextToSave").value;
  }

  if ((typeof nomFichier != "undefined") && (nomFichier.length>0)){
    fileNameToSaveAs = nomFichier+"."+extension;
  }else{
    fileNameToSaveAs = this.$.inputFileNameToSaveAs.value+"."+extension; // fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+"."+extension;
  }


  if ((typeof extension != "undefined") && (extension.length>0)){
    switch(extension){
      case "ttl" :
      textFileAsBlob = new Blob([textToWrite], {
        type:
        'text/turtle'
      }
    );
    break;
    case "rdf" :
    //pas implementé pour l'instant
    textFileAsBlob = new Blob([textToWrite], {
      type:
      'application/rdf+xml'
    }
  );
  break;
  default :
  console.log("non traite  , extension : "+extension);
  break;
}
}


console.log(nomFichier+" : "+extension);



var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
//console.log(window.URL);
//if (window.URL != null)
if(navigator.userAgent.indexOf("Chrome") != -1)
{
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  console.log("CHROME");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  console.log("FF");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.target="_blank";
  //downloadLink.onclick = destroyClickedElement;
  //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  console.log(this.$.popupTtl);
}
console.log(downloadLink);
/*downloadLink.click();*/
/* creation d'un event car download.click() ne fonctionne pas sous Firefox */
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click", true, false, window, 0, 0, 0, 0, 0
  , false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink);
}, 100);
}



}

window.customElements.define(SpogGraphe.is, SpogGraphe);
</script>
</dom-module>
