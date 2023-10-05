const { MongoClient, ObjectId } = require('mongodb');

class DB {
    db_uri;
    db_name;
    client;


    constructor() {
        this.db_uri = process.env.DB_URI;
        this.db_name = process.env.DB_NAME;
        this.client = new MongoClient(this.db_uri, { useUnifiedTopology: true });
        this.connect();
      }
    
      async connect() {
        try {
          await this.client.connect();
          console.log('Connected to the database');
        } catch (error) {
          console.error('Failed to connect to the database:', error);
        }
      }

      async FindAll(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    async FindbyEmail(collection,query={},project={}){
        try{
            await this.client.connect();
            console.log('inside function FindbyEmail :>> ',collection,query);
            return await this.client.db(this.db_name).collection(collection).findOne(query,project);
        }catch(error){
            console.log('error :>> ', error);
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    async UpdateUser(collection,user, firstName, lastName, email, phone, address) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).updateOne({_id:{$eq:user._id}},
            {
                $set:
                {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address
                }
            }
        );
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
        
    }

    async InsertUser(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    
    async DisableUser(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).UpdateUser(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    /*
    //reports actions

    // Work
    async ShowAllReports(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    // Work
    async ShowReportByCity(collection, query, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async FindAllUserReports(collection,user){
        try {
            await this.client.connect();
            let query = {_id: new ObjectId(user._id)}
            let reports =  await this.client.db(this.db_name).collection(collection).find(query, {reports:1}).toArray();
            console.log('reports :>> ', reports);
            return reports
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }

    }
    async ShowUserReports(collection, user) {
        try {
            console.log('Show User Reports :>> ',user._id);
            await this.client.connect();
        let query = {"userId":{$eq:user._id}}
            let userReports = await this.client.db(this.db_name).collection(collection).find(query).toArray();
            console.log('userReports:', userReports);
            return userReports;
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    //working
    async InsertNewReport(collection, doc,user) {
        try {
            await this.client.connect();
            let report = await this.client.db(this.db_name).collection(collection).insertOne(doc);
            console.log('report :>> ', report);
            return await this.client.db(this.db_name).collection('Users').updateOne({_id:{$eq:new ObjectId(user._id)}},{$push:{reports:report.insertedId}})
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async deleteReport(collection,id){
        try{
            console.log('3 :>> ', id);
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).deleteOne({_id:{$eq:new ObjectId(id)}});
        }catch(error){
            throw error;
        }
        finally{
            await this.client.close();
        }
    }
    //info actions
    async ShowAllQuerys(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async AddQuery(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async UpdateQuery(collection, query, doc) {
        console.log(collection)
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).updateOne(query, doc);
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async deleteInfo(collection,id){
        try{
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).deleteOne({_id:{$eq:new ObjectId(id)}});
        }catch(error){
            throw error;
        }
        finally{
            await this.client.close();
        }
    }

    */

}
module.exports = DB;