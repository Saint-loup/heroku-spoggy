/**
  * Custom agent prototype
  * @param {String} id
  * @constructor
  * @extend eve.Agent
  */
 function CommAgent(id, app) {
   // execute super constructor
   eve.Agent.call(this, id);
   this.app = app;
   // connect to all transports configured by the system
   this.connect(eve.system.transports.getAll());
 }

 // extend the eve.Agent prototype
 CommAgent.prototype = Object.create(eve.Agent.prototype);
 CommAgent.prototype.constructor = CommAgent;

 /**
  * Send a greeting to an agent
  * @param {String} to
  */
 CommAgent.prototype.sayHello = function(to) {
   this.send(to, 'Hello ' + to + '!');
 };

 /**
  * Handle incoming greetings. This overloads the default receive,
  * so we can't use CommAgent.on(pattern, listener) anymore
  * @param {String} from     Id of the sender
  * @param {*} message       Received message, a JSON object (often a string)
  */
 CommAgent.prototype.receive = function(from, message) {
   console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
      this.app.prop1 = message;

      if (typeof message == String && message.indexOf('Hello') === 0) {
        // reply to the greeting
        this.send(from, 'Hi ' + from + ', nice to meet you!');
      }


      switch(message.type){
        case 'addActions':
        //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
        //  this.catchCommande(chatMess,this.network,this);
        console.log ("addActions à envoyer au levelgraph, serveurs collab et rdf, PB, les couleurs changements de couleur ne semblent pas arriver ");
        console.log(message);

        break;
        default:
        console.log(message);
      }

 };
