Projet programmation web client
Ce projet est à réaliser en binôme. Le but de ce projet est de programmer une page web servant
d’application météo, en utilisant pour cela le site https://open-meteo.com/ et son API
https://api.open-meteo.com/v1/forecast.
Bien que la forme de votre page soit libre, elle devra remplir un certain nombre de fonctionnalités.
Toutes ces fonctionnalités sont à programmer en JavaScript côté client.
1) Dans un premier temps, les fonctionnalités suivantes vous sont demandées :

	• Afficher sur la page, la météo actuelle de Blois. Afficher également la météo globale de la
		journée (minimums/maximums, etc.) Fait ✓

	• Permettre à l’utilisateur de filtrer les informations qu’il souhaite/ne souhaite pas voir affiché
		sur la page

	• Enfin, permettre à l’utilisateur d’obtenir le détail heure par heure de l’évolution du temps
	dans les prochaines heures

2) Séparément, intégrez les informations correspondant aux prochains jours :
	• Indiquer si, globalement, le temps est à l’amélioration ou à la détérioration dans les
		prochains jours

	• Permettre à l’utilisateur de regarder le détail heure par heure des prochains jours.

3) Vis à vis des localisations :
	• Permettre à l’utilisateur d’afficher la météo actuelle, journalière et future d’un endroit précis
		(utilisez les coordonnées latitude/longitude)
	• Permettre à l’utilisateur d’afficher les informations correspondantes à plusieurs localisations
		en même temps
	• Permettre à l’utilisateur d’enregistrer une localisation, et la stocker localement, pour pouvoir
		la proposer facilement à l’utilisateur lors d’un prochain passage sur la page.
	• Permettre à l’utilisateur de rechercher une localisation grâce à son nom. Pour cela, vous
		pouvez utiliser l’API https://nominatim.openstreetmap.org.
4) Malheureusement, Météo France ne supporte pas l’utilisation de bounding box directement.
Développez des fonctionnalités permettant de remplacer cet outil :
	• Permettre à l’utilisateur d’indiquer une boîte (longitude min, longitude max, latitude min,
		latitude max), et filtrer les localisations pré-enregistrées par l’utilisateur pour ne garder que
		celles comprises dans cette boîte et afficher leur météo. Utilisez les vérifications de champ
		de formulaires côté client pour vérifier les champs.
	• Permettre à l’utilisateur de rechercher un département ou une région, et de la même façon,
		filtrer les localisations pré-enregistrées par l’utilisateur pour afficher leur météo.
	• (Bonus : plus difficile) Enfin, à partir d’une région ou d’une bounding box fournie par
		l’utilisateur, retrouver les villes comprises dans cette région, et permettre à l’utilisateur
		d’afficher leur météo et/ou de les ajouter à la liste des localisations enregistrées.
		L’aspect visuel de vos pages sera peu considéré lors de l’évaluation. Il est préférable d’avoir des
		implémentations fonctionnelles mais peu élégantes que des implémentations jolies et
		dysfonctionnelles ou inefficaces.


N’hésitez pas à faire preuve de créativité et à vous approprier le projet. Une fonctionnalité
manquante ne sera pas pénalisée si elle est justifiée et/ou remplacée par une autre de même niveau.
		
L’utilisation de code généré par IA est fortement déconseillée pour ce projet, ce qui ne vous
empêche pas de les utiliser pour vérifier vos implémentations et vous donner des idées. Vous serez
interrogés à l’oral sur votre code alors vous devez être capable d’en comprendre chaque ligne.
Date de dépôt du projet complet sur Celene : 17 Mars
Date de soutenance orale (10 minutes + 5 minutes de questions) : 18 Mars
