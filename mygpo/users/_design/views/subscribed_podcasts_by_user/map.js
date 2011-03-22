function(doc)
{
    if(doc.doc_type == "PodcastUserState")
    {
        subscribed_devices = [];

        for(n in doc.actions)
        {
            action = doc.actions[n];

            if(action.action == "subscribe")
            {
                subscribed_devices.push(action.device);
            }
            else
            {
                index = subscribed_devices.indexOf(action.device);
                subscribed_devices.splice(index, 1);
            }
        }

        for(n in subscribed_devices)
        {
            device = subscribed_devices[n];

            if(doc.disabled_devices && (doc.disabled_devices.indexOf(device) > -1))
            {
                continue;
            }


            if(doc.settings == null || doc.settings.public_subscription == null)
            {
                is_public = true;
            }
            else
            {
                is_public = doc.settings.public_subscription;
            }

            emit([doc.user_oldid, is_public, doc.podcast, device], null);
        }
    }
}