from mongoengine import connect, DynamicDocument, StringField, DateTimeField

####################################################################################################
########################################### Keep private ###########################################
####################################################################################################
connect('rps', host='mongodb+srv://admin:imnotyourchild@test-drdx8.mongodb.net/test?retryWrites=true&w=majority')