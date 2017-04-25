var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                myFunction(this);
            }
        };
       // xhttp.open("GET", "http://localhost:3000/hl7-v3-sample.xml", true);
        xhttp.open("GET", "http://localhost:3000/hl7-v3.xml", true);
        
        xhttp.send();

        function myFunction(xml) {
            result="";
            var xmlDoc = xml.responseXML;
                //Hospital Name
                template = xmlDoc.getElementsByTagName("templateId")[0];
                authName = template.getAttribute("assigningAuthorityName");
                document.getElementById("hos_name").innerHTML = authName;

                //Patient first Name
                document.getElementById("pat_first_name").innerHTML =
                xmlDoc.getElementsByTagName("given")[0].childNodes[0].nodeValue;

                //Patient last Name
                document.getElementById("pat_last_name").innerHTML =
                xmlDoc.getElementsByTagName("family")[0].childNodes[0].nodeValue;
                
                //Gender
                x = xmlDoc.getElementsByTagName("administrativeGenderCode")[0];
                txt = x.getAttribute("code");
                if(txt == 'M'){
                document.getElementById("pat_gender").innerHTML = "Male";
                }else{
                document.getElementById("pat_gender").innerHTML ="Female";
                }
                //Birth Date
                 date = xmlDoc.getElementsByTagName("birthTime")[0];
                bdate = date.getAttribute("value");
                
                var year = bdate.substring(0, 4);
                var month = bdate.substring(4, 6);
                var day = bdate.substring(6, 8);
                var date = day.concat("-",month,"-",year);
                document.getElementById("birth_date").innerHTML = date;
                 //Vital sign report
                x = xmlDoc.getElementsByTagName("observationEvent");
                for (i = 0; i < x.length ;i++) {
                 code=x[i].getElementsByTagName("code")[0];
                 displayName= code.getAttribute("displayName");

                 value =x[i].getElementsByTagName("value")[0];
                 units= value.getAttribute("unit");
                 res= value.getAttribute("value");

                  refRange=x[i].getElementsByTagName("referenceRange")[0];
                  intRange=refRange.getElementsByTagName("interpretationRange")[0];
                  range=intRange.getElementsByTagName("value")[0].childNodes[0].nodeValue;
                 statusCode=intRange.getElementsByTagName("interpretationCode")[0];
                 statusCd = statusCode.getAttribute("code");
                 if(statusCd == 'H'){
                     status="High";
                 }else if(statusCd=='L'){
                     status="Low";
                 }else{
                     status="Normal";
                 }
                 
                  result +="<tr><th>"+displayName+"</th><td>"+units+"</td><td>"+res+"</td><td>"+range+"</td><td>"+status+"</td></tr>";
                }
                document.getElementById("tableContainer").innerHTML = result;
        }