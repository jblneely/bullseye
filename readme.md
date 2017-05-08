My project has 3 models, for "Users", "Aims" (Objectives) and "Fires" (Key Results) which represent the main functional idea for my app.

Uusers must sign up/log in to view their "Profile" page.  Users passwords are hashed and an authorization flow is incorporated.

I incorporated the Facebook login API. Due to a migration issue, the FacebookId column does not appear in the heroku model.  I am working to fix this.


I have incorporated RESTful routes for my target resources with GET, POST, PUT, and DELETE and utilize an ORM to create a database table structure and interact with relationally-stored goal data.


I have prepared a powerpoint including wireframes that I designed during the planning process

My app is deployed on Heroku and accessible to the public, however the facebook login issue needs to be resolved.

If I had another week:

	Chart.js I would add a chart for each "aim" showing relative progress for each "fire".

	Moment.js add a time axis on the chart.

	Archive for completed Aims over time.

	add the ability to create notes attached to each aim.id by clicking on a slidout calendar.




