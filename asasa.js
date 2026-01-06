const n8n = {
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "gestionapp",
        options: {},
      },
      type: "n8n-nodes-base.webhook",
      typeVersion: 2,
      position: [-1200, 600],
      id: "72afc03c-00ce-4cf2-84eb-400d7bd2456d",
      name: "Webhook",
      webhookId: "9043ddba-e030-406a-9b3e-208e8e975afa",
    },
    {
      parameters: {
        promptType: "define",
        text: "Aqui tienes una imagen enviada por el usuario, Describe la imagen y transcribe cualquier texto o cifra visivle en la imagen. Incluye tantos detalles como sea posible",
        messages: {
          messageValues: [
            {
              type: "HumanMessagePromptTemplate",
              messageType: "imageBinary",
            },
          ],
        },
      },
      type: "@n8n/n8n-nodes-langchain.chainLlm",
      typeVersion: 1.5,
      position: [-160, 660],
      id: "9ef44ada-21f8-4e0b-81f0-7cb138d238eb",
      name: "Basic LLM Chain",
      alwaysOutputData: true,
    },
    {
      parameters: {
        model: {
          __rl: true,
          mode: "list",
          value: "gpt-4o-mini",
        },
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      typeVersion: 1.2,
      position: [-20, 780],
      id: "cbc2333e-9a65-4dc9-8a46-7b231e33248e",
      name: "OpenAI Chat Model",
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        resource: "audio",
        operation: "transcribe",
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.openAi",
      typeVersion: 1.8,
      position: [-40, 920],
      id: "0c53d289-e052-49e6-a117-7576364cb243",
      name: "OpenAI",
      alwaysOutputData: true,
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        promptType: "define",
        text: "={{ $json.text }}",
        options: {
          systemMessage:
            "={{ $json.prompt }}\n\nID del bot actual: {{ $('Type_msg').item.json.bot }}\n\nGoogle Sheets ID: {{ $json.sheet }}\nNombre o alias del cliente: {{ $('Type_msg').item.json.name }}",
        },
      },
      type: "@n8n/n8n-nodes-langchain.agent",
      typeVersion: 1.7,
      position: [240, 1080],
      id: "10312508-62d0-4c73-be79-2c0899ee20b2",
      name: "AI Agent",
      alwaysOutputData: true,
      notesInFlow: true,
      executeOnce: true,
      onError: "continueRegularOutput",
    },
    {
      parameters: {
        model: {
          __rl: true,
          value: "gpt-4o-mini",
          mode: "list",
          cachedResultName: "gpt-4o-mini",
        },
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      typeVersion: 1.2,
      position: [0, 1300],
      id: "86a61719-53dd-4b44-8520-f4b724366e9d",
      name: "OpenAI Chat Model2",
      notesInFlow: false,
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        sendTo:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To', `correo electronico`, 'string') }}",
        subject:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Subject', ``, 'string') }}",
        emailType: "text",
        message:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message', ``, 'string') }}",
        options: {
          senderName:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Sender_Name', ``, 'string') }}",
          replyTo:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Send_Replies_To', ``, 'string') }}",
          replyToSenderOnly:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Reply_to_Sender_Only', ``, 'boolean') }}",
        },
      },
      type: "n8n-nodes-base.gmailTool",
      typeVersion: 2.1,
      position: [820, 1300],
      id: "1268c74e-34b7-4dc3-8388-7e6b5597f6b7",
      name: "Gmail",
      webhookId: "a9199725-83ce-4be0-af5b-61cfc614f4b6",
      credentials: {
        gmailOAuth2: {
          id: "7l3GiCoVlYvhNIgv",
          name: "Gmail account",
        },
      },
    },
    {
      parameters: {
        sessionIdType: "customKey",
        sessionKey: "={{ $('Type_msg').item.json._id }}",
        contextWindowLength: 10,
      },
      type: "@n8n/n8n-nodes-langchain.memoryPostgresChat",
      typeVersion: 1.3,
      position: [160, 1300],
      id: "4c19e8f2-3dd2-426b-9455-7bfcee9baae8",
      name: "Postgres Chat Memory",
      credentials: {
        postgres: {
          id: "ifiMfOmFZanTkFDh",
          name: "Postgres account",
        },
      },
    },
    {
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              id: "3bdc3874-5a20-440a-8bf4-9b59c28c18e8",
              leftValue: "={{ $json._id }}",
              rightValue: "",
              operator: {
                type: "string",
                operation: "exists",
                singleValue: true,
              },
            },
          ],
          combinator: "and",
        },
        options: {},
      },
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [-1040, 800],
      id: "1b86330e-1e98-44bc-a2fc-da1163f55e8a",
      name: "If",
      alwaysOutputData: false,
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "name",
              value: "={{ $('Webhook').item.json.body.name }}",
              type: "string",
            },
            {
              id: "7be4d307-dbef-4b97-b198-765880bcb497",
              name: "phone",
              value: "={{ $('Webhook').item.json.body.phone }}",
              type: "string",
            },
            {
              id: "a7975ffc-4616-418f-bc8c-e9d2f087da1f",
              name: "host",
              value: "={{ $('Webhook').item.json.body.host }}",
              type: "string",
            },
            {
              id: "a84ba8cc-14ab-4d27-ad63-d27300e761ed",
              name: "bot",
              value: "={{ $('Webhook').item.json.body.bot }}",
              type: "string",
            },
            {
              id: "aecfa754-f1b2-4262-b9f1-af7f7b90c7a3",
              name: "company",
              value: "={{ $('Webhook').item.json.body.company }}",
              type: "string",
            },
            {
              id: "d411f3e5-ba02-4f07-b49a-c6b1deb25110",
              name: "inactivityRestart",
              value: "=0",
              type: "number",
            },
            {
              id: "5c5b903e-5867-47bb-b5da-2e588e670a82",
              name: "",
              value: "",
              type: "string",
            },
          ],
        },
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-860, 880],
      id: "0bc93747-8e2c-4dac-9615-365720aaef94",
      name: "Edit Fields",
    },
    {
      parameters: {
        mode: "raw",
        jsonOutput: "={{ $('Webhook').item.json.body }}\n",
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-1260, 800],
      id: "ae25f9af-1b3c-4d2c-880f-d37b1fea9022",
      name: "Edit Fields1",
    },
    {
      parameters: {
        mode: "raw",
        jsonOutput: "={{ $('Type_msg').item.json }}",
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [760, 840],
      id: "dae1bbe7-bbe9-4eec-ba5a-21187c0c80f4",
      name: "Edit Fields2",
      alwaysOutputData: true,
    },
    {
      parameters: {
        method: "POST",
        url: "=https://5ndkpj20-3000.use2.devtunnels.ms/bot/v1/{{$json.bot}}/messages",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            {
              name: "token",
              value:
                "={{ $('Webhook').item.json.headers['api-access-token'] }}",
            },
          ],
        },
        sendBody: true,
        bodyParameters: {
          parameters: [
            {
              name: "number",
              value: "={{ $json.phone }}",
            },
            {
              name: "message",
              value: "={{ $json.output }}",
            },
            {
              name: "urlMedia",
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [780, 1080],
      id: "c677377b-4c34-44c2-b0b6-647ae23cfd36",
      name: "HTTP Request",
      disabled: true,
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "user",
              value: "={{ $json._id }}",
              type: "string",
            },
            {
              id: "9731e7c2-8f91-4017-a487-38b3862a9c32",
              name: "completed",
              value: false,
              type: "boolean",
            },
          ],
        },
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-680, 820],
      id: "06a94128-911e-40a0-913c-34ca872242d0",
      name: "Edit Fields3",
    },
    {
      parameters: {
        model: {
          __rl: true,
          value: "gpt-4o",
          mode: "list",
          cachedResultName: "gpt-4o",
        },
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      typeVersion: 1.2,
      position: [-500, 1340],
      id: "dfa1378b-2a28-41f7-89c7-0b7aaf94b5d2",
      name: "OpenAI Chat Model4",
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        collection: "contexts",
        options: {},
        query:
          '={ "user": "{{ $(\'Add_context\').item.json.user }}", "completed": false }',
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [-260, 1020],
      id: "94bd70e9-4cc5-4ee4-ae1a-e329865f9e1f",
      name: "Consult_contexts",
      alwaysOutputData: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        operation: "insert",
        collection: "contexts",
        fields: "user,message,completed,uniqueId",
        options: {},
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [-460, 860],
      id: "c4effe14-f406-4679-be8f-688ec1091934",
      name: "Add_context",
      alwaysOutputData: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        operation: "insert",
        collection: "entities",
        fields: "name, phone, bot, company, host",
        options: {},
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [-1220, 1100],
      id: "92636f04-1b9c-4f80-8823-9bea54bdc18e",
      name: "Add_entity",
      alwaysOutputData: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        collection: "entities",
        options: {},
        query:
          '={ "phone": "{{$json.body.phone}}", "bot": "{{$json.body.bot}}" }',
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [-1480, 800],
      id: "a8e4600e-d84a-425e-8a6b-7aa1c229fdfe",
      name: "Consult_entity",
      alwaysOutputData: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        operation: "delete",
        collection: "contexts",
        query: '={{ JSON.stringify($json["query"]) }}',
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [-220, 1220],
      id: "0aa6a835-7bc3-4c59-a7fd-3d9c23e90f9c",
      name: "Delected_contexts",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        promptType: "define",
        text: "={{ $json.messages }}",
        messages: {
          messageValues: [
            {
              message:
                "Analiza los mensajes del cliente, y resúmelos de manera breve.",
            },
          ],
        },
      },
      type: "@n8n/n8n-nodes-langchain.chainLlm",
      typeVersion: 1.5,
      position: [-760, 1220],
      id: "5fcdf8e4-9a55-4081-8d1e-eaa667ec3b5a",
      name: "Basic LLM Chain2",
      alwaysOutputData: true,
      executeOnce: true,
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "messages",
              value: "={{$input.all().map(e => e.json.message)}}",
              type: "array",
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-1000, 1220],
      id: "8ee02f11-dd49-42c7-be62-da6e3be98310",
      name: "Messages",
      executeOnce: true,
    },
    {
      parameters: {
        action: "generate",
        dataPropertyName: "uniqueId",
      },
      type: "n8n-nodes-base.crypto",
      typeVersion: 1,
      position: [-640, 1040],
      id: "55943a70-fc21-436c-8c04-f98dcc87a74d",
      name: "Crypto",
      alwaysOutputData: true,
    },
    {
      parameters: {
        jsCode:
          "const ids = $('Consult_contexts').all().map(item => item.json.uniqueId);\nreturn [{\n  json: { query: {uniqueId: { \"$in\": ids }}}\n}];",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-380, 1220],
      id: "6b1aa0f1-f32f-4441-a45e-aa5504cfff60",
      name: "Code",
      executeOnce: true,
    },
    {
      parameters: {
        jsCode: "return $('Webhook').all()",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-500, 680],
      id: "7b7c4751-f732-412c-a2a1-f8946cc8444e",
      name: "Code1",
    },
    {
      parameters: {
        jsCode: "return $('Webhook').all()",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-260, 800],
      id: "782d792c-97d3-4f79-9931-c193c283efbe",
      name: "Code2",
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "text",
              value: "={{ $('Basic LLM Chain2').item.json.text }}",
              type: "string",
            },
            {
              id: "ed79bccd-c743-46d7-9c2b-a8b4bf584a28",
              name: "session_id",
              value: "={{ $('Consult_contexts').item.json.user }}",
              type: "string",
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-40, 1100],
      id: "1eed76aa-9a76-4719-af14-c8c140e5b57d",
      name: "Edit Fields4",
    },
    {
      parameters: {
        amount: 2,
      },
      type: "n8n-nodes-base.wait",
      typeVersion: 1.1,
      position: [-440, 1060],
      id: "4994ca4d-708b-4ea9-b08c-548052a8f4b7",
      name: "Wait",
      webhookId: "5771757a-a88f-4ff8-b2aa-4d7db4acbf19",
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "inactivityRestart",
              value:
                "={{ $json.fromMe == 'false' && $json.inactivityRestart < Date.now() ? 0 : Date.now() + (15 * 60 * 1000) }}",
              type: "number",
            },
          ],
        },
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-300, 560],
      id: "b5fcf4cf-eb74-4929-9b78-e12af3d316aa",
      name: "Edit Fields5",
    },
    {
      parameters: {
        operation: "update",
        collection: "entities",
        updateKey: "_id",
        fields: "inactivityRestart",
        options: {},
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [680, 560],
      id: "c8c14d7c-40ce-45b0-9d74-a456b3efab6e",
      name: "MongoDB",
      alwaysOutputData: true,
      notesInFlow: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        rules: {
          values: [
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    leftValue: "={{ $json.inactivityRestart }}",
                    rightValue: 0,
                    operator: {
                      type: "number",
                      operation: "equals",
                    },
                  },
                ],
                combinator: "and",
              },
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.switch",
      typeVersion: 3.2,
      position: [1460, 1280],
      id: "63929e6f-234b-4ff3-aabb-a5dae2c348b6",
      name: "Type_msg1",
      alwaysOutputData: false,
      onError: "continueRegularOutput",
    },
    {
      parameters: {
        documentId: {
          __rl: true,
          value:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Document', `Google Sheets ID`, 'string') }}",
          mode: "id",
        },
        sheetName: {
          __rl: true,
          value:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Sheet', ``, 'string') }}",
          mode: "name",
        },
        options: {},
      },
      type: "n8n-nodes-base.googleSheetsTool",
      typeVersion: 4.5,
      position: [560, 1300],
      id: "eef3488e-bb1d-490b-9851-adca57daf717",
      name: "Google Sheets",
      credentials: {
        googleSheetsOAuth2Api: {
          id: "I7YH7MizJ6D7xdxj",
          name: "Google Sheets account",
        },
      },
    },
    {
      parameters: {
        promptType: "define",
        text: "Aqui tienes una imagen enviada por el usuario, Describe la imagen y transcribe cualquier texto o cifra visivle en la imagen. Incluye tantos detalles como sea posible",
        messages: {
          messageValues: [
            {
              type: "HumanMessagePromptTemplate",
              messageType: "imageBinary",
            },
          ],
        },
      },
      type: "@n8n/n8n-nodes-langchain.chainLlm",
      typeVersion: 1.5,
      position: [0, 0],
      id: "5bfb0075-9e26-47f8-a005-d001398be3de",
      name: "Basic LLM Chain1",
      alwaysOutputData: true,
    },
    {
      parameters: {
        model: {
          __rl: true,
          mode: "list",
          value: "gpt-4o-mini",
        },
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      typeVersion: 1.2,
      position: [260, 120],
      id: "5f682cc6-5438-498d-bcca-f14ab0f618b9",
      name: "OpenAI Chat Model1",
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        resource: "audio",
        operation: "transcribe",
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.openAi",
      typeVersion: 1.8,
      position: [-100, 180],
      id: "c16add25-8165-4625-afdc-42b073d94e5b",
      name: "OpenAI1",
      alwaysOutputData: true,
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        jsCode: "return $('Webhook').all()",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-300, 180],
      id: "a3be2a52-e682-400f-8ebf-2d13392170d4",
      name: "Code3",
    },
    {
      parameters: {
        jsCode: "return $('Webhook').all()",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-300, 40],
      id: "1afcb47b-c638-4c9b-b539-7a4f879151c8",
      name: "Code4",
    },
    {
      parameters: {
        mode: "raw",
        jsonOutput: "={{ $('Type_msg').item.json }}",
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [1660, 220],
      id: "d4db6d18-9dee-49f9-8f6e-0f9e14abe673",
      name: "Edit Fields6",
      alwaysOutputData: true,
    },
    {
      parameters: {
        method: "POST",
        url: "=https://chatbots.gestionapp.co/bot/v1/{{$json.bot}}/messages",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            {
              name: "token",
              value:
                "={{ $('Webhook').item.json.headers['api-access-token'] }}",
            },
          ],
        },
        sendBody: true,
        bodyParameters: {
          parameters: [
            {
              name: "number",
              value: "={{ $json.phone }}",
            },
            {
              name: "message",
              value: "={{ $json.output ?? $json.error }}",
            },
            {
              name: "urlMedia",
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [1700, 1080],
      id: "a5b9d7c3-e6b4-469a-bfc0-813b8167c315",
      name: "HTTP Request1",
    },
    {
      parameters: {
        driveId: {
          __rl: true,
          mode: "list",
          value: "My Drive",
        },
        folderId: {
          __rl: true,
          mode: "list",
          value: "root",
          cachedResultName: "/ (Root folder)",
        },
        options: {},
      },
      type: "n8n-nodes-base.googleDriveTool",
      typeVersion: 3,
      position: [1220, 420],
      id: "41775bdd-820c-44aa-8f18-587bb6724b7c",
      name: "Google Drive",
      disabled: true,
    },
    {
      parameters: {
        rules: {
          values: [
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "ac8945c8-a5cf-476c-8a7c-1695264a274e",
                    leftValue: '={{ $json.type.startsWith("image") }}',
                    rightValue: "image",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "image",
            },
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "7dcf7b72-b094-41b9-8dae-2ea3e8219a77",
                    leftValue: '={{ $json.type.startsWith("audio") }}',
                    rightValue: "voice_note",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "voice",
            },
          ],
        },
        options: {
          fallbackOutput: "extra",
          renameFallbackOutput: "text",
        },
      },
      type: "n8n-nodes-base.switch",
      typeVersion: 3.2,
      position: [-580, 420],
      id: "26297ea3-20b1-4151-8972-efa31f553542",
      name: "yo-con-yo",
      alwaysOutputData: false,
      onError: "continueRegularOutput",
    },
    {
      parameters: {
        rules: {
          values: [
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "0e4ee160-ea19-49df-8811-6efc6efcf4a3",
                    leftValue: "={{ $json.phone === $json.host }}",
                    rightValue: "",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "settings",
            },
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "55b38c11-295a-4e08-a04e-9db30dbe445d",
                    leftValue:
                      "={{ $json.fromMe == 'true' || $json.inactivityRestart > 0 }}",
                    rightValue: "",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "update",
            },
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "ac8945c8-a5cf-476c-8a7c-1695264a274e",
                    leftValue:
                      "={{ $json.type === 'image' &&  $json.fromMe == 'false' }}",
                    rightValue: "image",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "image",
            },
            {
              conditions: {
                options: {
                  caseSensitive: true,
                  leftValue: "",
                  typeValidation: "strict",
                  version: 2,
                },
                conditions: [
                  {
                    id: "7dcf7b72-b094-41b9-8dae-2ea3e8219a77",
                    leftValue:
                      "={{ $json.type === 'voice_note' &&  $json.fromMe == 'false' }}",
                    rightValue: "voice_note",
                    operator: {
                      type: "boolean",
                      operation: "true",
                      singleValue: true,
                    },
                  },
                ],
                combinator: "and",
              },
              renameOutput: true,
              outputKey: "voice",
            },
          ],
        },
        options: {
          fallbackOutput: "extra",
          renameFallbackOutput: "text",
        },
      },
      type: "n8n-nodes-base.switch",
      typeVersion: 3.2,
      position: [-860, 640],
      id: "081fb9e3-581c-4c4e-b881-fd150b61e549",
      name: "Type_msg",
      alwaysOutputData: false,
      onError: "continueRegularOutput",
    },
    {
      parameters: {
        jsCode: "return $('Webhook').all()",
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-1720, 800],
      id: "036ae5ec-35eb-417a-b7d3-2741f28f045f",
      name: "Code5",
    },
    {
      parameters: {
        descriptionType: "manual",
        toolDescription:
          '{\n  "type": "object",\n  "properties": {\n    "Start": { "type": "string", "format": "date-time" },\n    "End": { "type": "string", "format": "date-time" },\n    "Use_Default_Reminders": { "type": "boolean" },\n    "Attendees": { "type": "string", "format": "email" },\n    "Description": { "type": "string" },\n    "Guests_Can_Invite_Others": { "type": "boolean" },\n    "Max_Attendees": { "type": "integer", "minimum": 1 },\n    "Repeat_How_Many_Times_": { "type": "integer", "minimum": 0 },\n    "Repeat_Until": { "type": "string", "format": "date-time", "nullable": true },\n    "RRULE": { "type": "string", "nullable": true },\n    "Summary": { "type": "string" }\n  },\n  "required": ["Start", "End", "Attendees", "Description", "Summary"]\n}\n',
        calendar: {
          __rl: true,
          value: "samyrsaldarriaga@gmail.com",
          mode: "list",
          cachedResultName: "samyrsaldarriaga@gmail.com",
        },
        start:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Start', `campo requerido en base a la fecha actual obtenida de la función DateTime`, 'string') }}",
        end: "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('End', ``, 'string') }}",
        useDefaultReminders:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Use_Default_Reminders', ``, 'boolean') }}",
        additionalFields: {
          attendees: [
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Attendees', `requerido que el cliente proporcione el o los emails para agendar`, 'string') }}",
          ],
          description:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Description', `requerido, que se describa la intención del cliente`, 'string') }}",
          guestsCanInviteOthers:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Guests_Can_Invite_Others', ``, 'boolean') }}",
          maxAttendees:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Max_Attendees', ``, 'number') }}",
          repeatHowManyTimes:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Repeat_How_Many_Times_', ``, 'number') }}",
          repeatUntil:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Repeat_Until', ``, 'string') }}",
          rrule:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('RRULE', `opcional ej: \nRRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20241231T235959Z\nSignifica que el evento se repite semanalmente los lunes, miércoles y viernes hasta el 31 de diciembre de 2024.\n\nRRULE:FREQ=DAILY;COUNT=10\nEsto hace que el evento se repita 10 veces en lugar de hasta una fecha específica.\n`, 'string') }}",
          sendUpdates: "all",
          summary:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Summary', `requerido, nombre o alias del cliente seguido del objetivo resumido de la reunión`, 'string') }}",
        },
      },
      type: "n8n-nodes-base.googleCalendarTool",
      typeVersion: 1.3,
      position: [700, 1300],
      id: "96946700-4fed-45c7-b7d1-cf1aba7d4ec0",
      name: "Google Calendar",
      credentials: {
        googleCalendarOAuth2Api: {
          id: "XHnI3hrvbNtEA4oo",
          name: "Google Calendar account",
        },
      },
      disabled: true,
    },
    {
      parameters: {
        includeTime:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Include_Current_Time', ``, 'boolean') }}",
        outputFieldName:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Output_Field_Name', ``, 'string') }}",
        options: {},
      },
      type: "n8n-nodes-base.dateTimeTool",
      typeVersion: 2,
      position: [300, 1300],
      id: "309a64b3-6dab-433f-a002-b6ccdac8a3be",
      name: "DateTime",
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "text",
              value: "={{ $('Type_msg').item.json.message }}",
              type: "string",
            },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [-300, 320],
      id: "065fd878-9e03-4502-94bf-a7e975250766",
      name: "Edit Fields7",
    },
    {
      parameters: {
        documentId: {
          __rl: true,
          value:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Document', ``, 'string') }}",
          mode: "id",
        },
        sheetName: {
          __rl: true,
          value:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Sheet', ``, 'string') }}",
          mode: "name",
        },
        options: {},
      },
      type: "n8n-nodes-base.googleSheetsTool",
      typeVersion: 4.5,
      position: [540, 420],
      id: "3804e3f7-c5e7-4756-a8b1-c30f610e1898",
      name: "Products_Services",
      credentials: {
        googleSheetsOAuth2Api: {
          id: "I7YH7MizJ6D7xdxj",
          name: "Google Sheets account",
        },
      },
    },
    {
      parameters: {
        model: {
          __rl: true,
          value: "gpt-4o",
          mode: "list",
          cachedResultName: "gpt-4o",
        },
        options: {},
      },
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      typeVersion: 1.2,
      position: [-180, 420],
      id: "5f18688a-6d00-4ad9-b86c-c410addcbe26",
      name: "OpenAI Admin",
      notesInFlow: true,
      credentials: {
        openAiApi: {
          id: "E3OASnxh2bmk4RYe",
          name: "OpenAi account",
        },
      },
    },
    {
      parameters: {
        sessionIdType: "customKey",
        sessionKey: "={{ $('Type_msg').item.json._id }}",
        contextWindowLength: 50,
      },
      type: "@n8n/n8n-nodes-langchain.memoryPostgresChat",
      typeVersion: 1.3,
      position: [-20, 420],
      id: "b4a0e793-d7dc-4c79-a760-cde5fd453753",
      name: "Postgres Amin",
      credentials: {
        postgres: {
          id: "ifiMfOmFZanTkFDh",
          name: "Postgres account",
        },
      },
    },
    {
      parameters: {
        includeTime:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Include_Current_Time', ``, 'boolean') }}",
        outputFieldName:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Output_Field_Name', ``, 'string') }}",
        options: {},
      },
      type: "n8n-nodes-base.dateTimeTool",
      typeVersion: 2,
      position: [120, 420],
      id: "950915fa-7686-4477-8dfc-6f02e2bf6466",
      name: "Date Time",
    },
    {
      parameters: {
        collection: "prompts",
        options: {},
        query:
          "={ \"bot\": \"{{ $fromAI('bot', `id del bot para buscar prompt`, 'string') }}\" }",
      },
      type: "n8n-nodes-base.mongoDbTool",
      typeVersion: 1.1,
      position: [260, 420],
      id: "6153ff6f-651d-43fb-84d4-d67f4f77863b",
      name: "Find Prompts",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        descriptionType: "manual",
        toolDescription:
          "={{ $fromAI('bot', `id del bot`, 'string', 's_7ED') }}\n{{ $fromAI('text', `texto del prompt`, 'string') }}\n{{ $fromAI('drive', `opcional si se tiene de google drive`, 'string') }} \n{{ $fromAI('sheet', `opcional si se tiene de google sheets`, 'string') }}",
        operation: "findOneAndUpdate",
        collection: "prompts",
        updateKey: "bot",
        fields: "bot,text,drive,sheet",
        upsert:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Upsert', ``, 'boolean') }}",
        options: {},
      },
      type: "n8n-nodes-base.mongoDbTool",
      typeVersion: 1.1,
      position: [400, 420],
      id: "7054b6c5-63ce-4c1c-a2bd-d24b017126c0",
      name: "Insert Prompts",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        promptType: "define",
        text: "={{ $json.text }}\n\n{{ $json.user_text }}",
        options: {
          systemMessage:
            '=Rol: Eres un Asistente de Gestión Empresarial especializado en automatización y optimización de flujos de trabajo empresariales y gestión de información.\n\nID del Bot a Gestionar: "{{ $(\'Type_msg\').item.json.bot }}"\n\nInstrucciones:\n1. Genera prompts personalizados claros y precisos basados en el contexto proporcionado por el usuario.\n2. Antes de procesar, verifica que los datos cumplan con el esquema necesario para la operación que incluyen: id del bot, texto del prompt, drive (opcional), sheet (opcional).\n3. Usa la función "Find_Prompts" para verificar la existencia previa del prompt y evitar duplicados antes de almacenamiento.\n4. Inserta los prompts preparados en la base de datos usando la función "Insert_Prompts" asegurando que todos los campos necesarios están presentes.\n5. Realiza web scraping para extraer información pertinente de sitios web proporcionados por el usuario y úsala para complementar y mejorar los prompts generados usa la funcion "HTTP_Scraping" y pasale la url.\n6. Facilita la gestión de productos o servicios añadiendo filas de información a hojas de Excel, asegurando que la información esté estructurada y actualizada.\n\nReglas:\n1. No inventes información ni asumas contexto que no ha sido proporcionado explícitamente por el usuario.\n2. Usa el formato adecuado, asegurando que todas las entradas y salidas siguen el esquema definido.\n3. Prioriza eficiencia y claridad al generar las respuestas.\n4. Implementa manejo de errores proporcionando mensajes claros y detalla qué podría necesitar corrección.\n5. Busca continuamente optimizar los prompts, solicitando retroalimentación del usuario sobre la efectividad del resultado.\n\nEjemplo:\n- Contexto proporcionado: "Necesitamos un prompt para manejar consultas de servicio al cliente y actualizar nuestra lista de servicios con nueva información."\n- Prompt generado: "Rol: Eres un Asistente de Servicio al Cliente y Gestión de Servicios. Instrucciones:... Regla:..."\n\nConsideraciones adicionales:\n- Asegúrate de que cada prompt y cada acción tengan un propósito claro y se ajusten a las necesidades específicas del usuario.\n- Proporciona revisiones iterativas del prompt y las acciones realizadas, ajustándolas según se reciba retroalimentación.\n- Mantén un enfoque proactivo para asegurar que las listas de productos y servicios estén siempre al día.\n',
        },
      },
      type: "@n8n/n8n-nodes-langchain.agent",
      typeVersion: 1.7,
      position: [620, 220],
      id: "0fbf00a7-c8a8-4172-9068-f394ea0d491d",
      name: "AI Agent Admin",
      alwaysOutputData: true,
      notesInFlow: true,
      onError: "continueErrorOutput",
    },
    {
      parameters: {
        toolDescription:
          "Esta herramienta recibe una URL y devuelve el HTML de la página solicitada, usando fetch y Cheerio.",
        url: "=",
        optimizeResponse: true,
        responseType: "text",
        truncateResponse: true,
        maxLength: 5000,
      },
      type: "@n8n/n8n-nodes-langchain.toolHttpRequest",
      typeVersion: 1.1,
      position: [1520, 420],
      id: "dc18d15a-f715-435f-91d4-56af6dbde887",
      name: "HTTP Scraping",
      disabled: true,
    },
    {
      parameters: {
        assignments: {
          assignments: [
            {
              id: "bafe00d6-b29f-4564-b76b-b1575baae1f7",
              name: "user_text",
              value:
                "={{ $('Type_msg').item.json.message !== $json.text ? ($('Type_msg').item.json.message ?? '') : '' }}",
              type: "string",
            },
            {
              id: "ea4d1b5b-22ff-4d0f-b817-3257aa1aaaa2",
              name: "url",
              value:
                "={{ ($json.text.match(/https?:\\/\\/[^\\s]+/g) || [''])[0]}}",
              type: "string",
            },
          ],
        },
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [480, 220],
      id: "e1be0f3b-715b-43d8-903d-242465ed2f88",
      name: "Fields_Ai_Admin",
    },
    {
      parameters: {
        name: "WebScraper",
        description:
          "Esta herramienta recibe una URL y devuelve el HTML de la página solicitada, usando fetch y Cheerio.",
        jsCode:
          "// Usa $fromAI para que el AI te proporcione la URL deseada\nconst url = \"{{ $fromAI('url', 'Proporciona la URL del sitio a consultar', 'string', 'https://ejemplo.com') }}\";\n\nasync function run() {\n  // Requerimos axios en el entorno de n8n\n  const axios = require('axios');\n\n  // Hacemos la solicitud GET con axios\n  const response = await axios.get(url);\n\n  // Obtenemos el HTML del body\n  const html = response.data;\n\n  // Retornamos el resultado\n  return [{ json: { html } }];\n}\n\nreturn run();\n",
      },
      type: "@n8n/n8n-nodes-langchain.toolCode",
      typeVersion: 1.1,
      position: [1360, 420],
      id: "44f575fd-9d23-43fe-82d7-19cae0579bbd",
      name: "Code Tool",
      disabled: true,
    },
    {
      parameters: {
        name: "web_scraping",
        description: "LLama este tool cuando se necesite una raspado de la web",
        workflowId: {
          __rl: true,
          value: "TXcIiLsriSfi1kRV",
          mode: "list",
          cachedResultName: "web_scraping",
        },
        workflowInputs: {
          mappingMode: "defineBelow",
          value: {
            url: "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('url', ``, 'string') }}",
            purpose:
              "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('purpose', `este campo solo puede tener uno de estos 2 valores \"prompts\" o \"productos y servicios\"`, 'string') }}",
          },
          matchingColumns: ["url"],
          schema: [
            {
              id: "url",
              displayName: "url",
              required: false,
              defaultMatch: false,
              display: true,
              canBeUsedToMatch: true,
              type: "string",
              removed: false,
            },
            {
              id: "purpose",
              displayName: "purpose",
              required: false,
              defaultMatch: false,
              display: true,
              canBeUsedToMatch: true,
              type: "string",
              removed: false,
            },
          ],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
      },
      type: "@n8n/n8n-nodes-langchain.toolWorkflow",
      typeVersion: 2,
      position: [700, 420],
      id: "51e31d2f-5cee-40dc-9dce-6d9440a7db23",
      name: "Call n8n Workflow Tool",
    },
    {
      parameters: {
        collection: "prompts",
        options: {},
        query: '={ "bot": "{{ $(\'Type_msg\').item.json.bot }}" }',
      },
      type: "n8n-nodes-base.mongoDb",
      typeVersion: 1.1,
      position: [500, 660],
      id: "28734b59-82bc-4a36-80ac-221287e31465",
      name: "Consult_prompts",
      alwaysOutputData: true,
      executeOnce: true,
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        assignments: {
          assignments: [],
        },
        includeOtherFields: true,
        options: {},
      },
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [220, 780],
      id: "5319eba3-fda0-4fb1-92dc-5a8e36be1348",
      name: "Fields_prompt_before",
    },
    {
      parameters: {
        jsCode:
          'const Fields_prompt_before = $("Fields_prompt_before").first().json;\nreturn [\n  {\n    json: {\n      prompt: $input.first().json?.text ?? "",\n      ...$input.first().json || {},\n      ...Fields_prompt_before,\n    },\n  },\n];\n',
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [420, 880],
      id: "4116ec63-e52b-4dca-8c74-8b5b8e63d443",
      name: "Fields_prompt_after",
      executeOnce: true,
    },
    {
      parameters: {
        familyName:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Family_Name', ``, 'string') }}",
        givenName:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Given_Name', ``, 'string') }}",
        additionalFields: {
          addressesUi: {
            addressesValues: {
              streetAddress:
                "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Street_Address', ``, 'string') }}",
              city: "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('City', ``, 'string') }}",
              region:
                "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Region', ``, 'string') }}",
              countryCode:
                "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Country_Code', ``, 'string') }}",
              postalCode:
                "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Postal_Code', ``, 'string') }}",
              type: "home",
            },
          },
          birthday:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Birthday', ``, 'string') }}",
          companyUi: {
            companyValues: [
              {
                current:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Current', ``, 'boolean') }}",
                domain:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Domain', ``, 'string') }}",
                name: "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Name', ``, 'string') }}",
                title:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Title', ``, 'string') }}",
              },
            ],
          },
          customFieldsUi: {
            customFieldsValues: [
              {
                key: "Bot",
                value:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Value', `ID del bot actual`, 'string') }}",
              },
            ],
          },
          emailsUi: {
            emailsValues: [
              {
                type: "work",
                value:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Value', ``, 'string') }}",
              },
            ],
          },
          phoneUi: {
            phoneValues: [
              {
                type: "mobile",
                value:
                  "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Value', ``, 'string') }}",
              },
            ],
          },
        },
      },
      type: "n8n-nodes-base.googleContactsTool",
      typeVersion: 1,
      position: [420, 1300],
      id: "e2839e8b-e11e-45f2-ab2c-445a7eecc332",
      name: "Google Contacts",
      credentials: {
        googleContactsOAuth2Api: {
          id: "wONbQzOT5nUEg54X",
          name: "Google Contacts account",
        },
      },
      disabled: true,
    },
    {
      parameters: {
        collection: "catalog",
        options: {},
        query:
          "={ \"botId\": \"{{ $fromAI('bot', `id del bot para buscar`, 'string', 'e6-G4') }}\" }",
      },
      type: "n8n-nodes-base.mongoDbTool",
      typeVersion: 1.1,
      position: [840, 420],
      id: "b6821317-6f97-4ccb-8466-1fca381bae70",
      name: "Find Catalog",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        descriptionType: "manual",
        toolDescription:
          "=LLamar este tool cuando se requiera agregar o editar productos o servicios del catalogó.\n{{ $fromAI('name', `requerido`, 'string') }}\n{{ $fromAI('uniqueCode', `requerido`, 'string') }} \n{{ $fromAI('botId', `requerido`, 'string') }}\n{{ $fromAI('type', `Product || service, requerido`, 'string', 'Product') }}\n{{ $fromAI('category', `requerido`, 'string') }}\n{{ $fromAI('description', `opcional`, 'string') }}\n{{ $fromAI('price', `opciona`, 'number', '0') }}\n{{ $fromAI('attributes', `Atributos específicos según el tipo`, 'json') }}\n{{ $fromAI('tags', `Etiquetas o palabras clave asociadas.`, '', '[\"uno\"]') }}\n{{ $fromAI('additionalData', `Información extra, sin estructura predefinida.`, 'json') }}\n{{ $fromAI('createdAt', ``) }}\n{{ $fromAI('updatedAt', ``) }}",
        operation: "findOneAndUpdate",
        collection: "catalog",
        updateKey: "uniqueCode",
        fields:
          "=name,uniqueCode,botId,type,description,category,price,attributes,tags,createdAt,updatedAt,additionalData",
        upsert:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Upsert', ``, 'boolean') }}",
        options: {},
      },
      type: "n8n-nodes-base.mongoDbTool",
      typeVersion: 1.1,
      position: [960, 420],
      id: "7547feab-4106-43d9-a0de-7109dcf8fbaa",
      name: "Insert Catalog",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        action: "generate",
        dataPropertyName:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Property_Name', ``, 'string') }}",
      },
      type: "n8n-nodes-base.cryptoTool",
      typeVersion: 1,
      position: [1080, 420],
      id: "fbae543d-04dd-480e-b13f-d4c08a19d497",
      name: "Crypto1",
    },
    {
      parameters: {
        collection: "catalog",
        options: {
          limit:
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Limit', ``, 'number') }}",
          skip: "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Skip', ``, 'number') }}",
          sort: "={{ $fromAI('Sort__JSON_Format_', ``, 'string') }}",
        },
        query:
          '={{ $fromAI(\'Query__JSON_Format_\', `{\n  "botId": "Fixed Identificador del bot.",\n  "name": "(opcional) Nombre del producto o servicio.",\n  "uniqueCode": "(opcional) Código único que identifica el producto o servicio.",\n  "type": "(opcional) Tipo de elemento: \'Product\' o \'Service\'",\n  "category": "(opcional) Categoría o sector al que pertenece el elemento.",\n  "price": "(opcional) Precio del producto o servicio.",\n  "attributes": "(opcional) Atributos específicos según el tipo.",\n  "tags": "(opcional) Etiquetas o palabras clave asociadas."\n}`, \'string\') }}',
      },
      type: "n8n-nodes-base.mongoDbTool",
      typeVersion: 1.1,
      position: [920, 1300],
      id: "e42d74b7-cd04-4678-920b-31c771f3265f",
      name: "Find Catalog1",
      credentials: {
        mongoDb: {
          id: "U9itKl9VbAF8So7L",
          name: "MongoDB account",
        },
      },
    },
    {
      parameters: {
        toolDescription:
          '{\n  "title": "creación de negocio",\n  "description": "Esta función debe ser llamada cuando se exprese la intención de crear un nuevo negocio para un chatBot"\n  "type": "object",\n  "properties": {\n    "typeDocument": {\n      "type": "string",\n      "enum": ["CC", "CE", "NIT", "DNI"],\n      "description": "Tipo de documento"\n    },\n    "numberDocument": {\n      "type": "string",\n      "description": "Número de documento"\n    },\n    "name": {\n      "type": "string",\n      "minLength": 3,\n      "maxLength": 20,\n      "description": "Nombre de la cuenta"\n    }\n  },\n  "required": ["typeDocument", "numberDocument", "name"],\n  "additionalProperties": false\n}\n',
        method: "POST",
        url: "https://chatbots.gestionapp.co/api/company",
        sendBody: true,
        parametersBody: {
          values: [
            {
              name: "typeDocument",
            },
            {
              name: "numberDocument",
            },
            {
              name: "name",
            },
          ],
        },
      },
      type: "@n8n/n8n-nodes-langchain.toolHttpRequest",
      typeVersion: 1.1,
      position: [1060, 1300],
      id: "2af3e18b-69f7-4ab4-9a5a-c6982fb4d72c",
      name: "HTTP Request2",
    },
    {
      parameters: {
        operation: "getAll",
        calendar: {
          __rl: true,
          value: "samyrsaldarriaga@gmail.com",
          mode: "list",
          cachedResultName: "samyrsaldarriaga@gmail.com",
        },
        returnAll:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Return_All', ``, 'boolean') }}",
        timeMin:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('After', ``, 'string') }}",
        timeMax:
          "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Before', ``, 'string') }}",
        options: {},
      },
      type: "n8n-nodes-base.googleCalendarTool",
      typeVersion: 1.3,
      position: [1200, 1300],
      id: "8ca48b1a-4abb-4625-af69-866bfdee1aad",
      name: "Google Calendar1",
      credentials: {
        googleCalendarOAuth2Api: {
          id: "XHnI3hrvbNtEA4oo",
          name: "Google Calendar account",
        },
      },
      disabled: true,
    },
    {
      parameters: {
        name: "Agente_de_calendario",
        description:
          "Utilizará esta tool para obtener cualquier información del calendario, horarios disponibles, citas agendadas, eliminar o añadir citas. ",
        workflowId: {
          __rl: true,
          value: "d6l5s2QvQFsso02F",
          mode: "list",
          cachedResultName: "agendamiento",
        },
        workflowInputs: {
          mappingMode: "defineBelow",
          value: {},
          matchingColumns: [],
          schema: [],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
      },
      type: "@n8n/n8n-nodes-langchain.toolWorkflow",
      typeVersion: 2,
      position: [500, 1540],
      id: "680bfd7b-f868-434b-b4a6-4bfd32d953f5",
      name: "Agente de Calendario1",
    },
    {
      parameters: {
        name: "Agente_CRM_Clinica",
        description:
          "Llama a este Agente si necesitas información de los servicios, horarios de visita disponibles, doctores, registrar algun nuevo lead o anotar una nueva visita confirmada",
        workflowId: {
          __rl: true,
          value: "8aNtKrLb5PkT6Ljr",
          mode: "list",
          cachedResultName: "Agente CRM - Clinica",
        },
        workflowInputs: {
          mappingMode: "defineBelow",
          value: {},
          matchingColumns: [],
          schema: [],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
      },
      type: "@n8n/n8n-nodes-langchain.toolWorkflow",
      typeVersion: 2,
      position: [340, 1560],
      id: "15261713-6bf3-45e6-80cc-41193fa00e57",
      name: "Agente CRM Clinica1",
      disabled: true,
    },
  ],
  connections: {
    Webhook: {
      main: [
        [
          {
            node: "Consult_entity",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Basic LLM Chain": {
      main: [
        [
          {
            node: "Fields_prompt_before",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "OpenAI Chat Model": {
      ai_languageModel: [
        [
          {
            node: "Basic LLM Chain",
            type: "ai_languageModel",
            index: 0,
          },
        ],
      ],
    },
    OpenAI: {
      main: [
        [
          {
            node: "Fields_prompt_before",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "AI Agent": {
      main: [
        [
          {
            node: "Edit Fields2",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "OpenAI Chat Model2": {
      ai_languageModel: [
        [
          {
            node: "AI Agent",
            type: "ai_languageModel",
            index: 0,
          },
        ],
      ],
    },
    Gmail: {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Postgres Chat Memory": {
      ai_memory: [
        [
          {
            node: "AI Agent",
            type: "ai_memory",
            index: 0,
          },
        ],
      ],
    },
    If: {
      main: [
        [
          {
            node: "Type_msg",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Edit Fields",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields": {
      main: [
        [
          {
            node: "Add_entity",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields1": {
      main: [
        [
          {
            node: "If",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields2": {
      main: [
        [
          {
            node: "HTTP Request",
            type: "main",
            index: 0,
          },
          {
            node: "HTTP Request1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields3": {
      main: [
        [
          {
            node: "Crypto",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "OpenAI Chat Model4": {
      ai_languageModel: [
        [
          {
            node: "Basic LLM Chain2",
            type: "ai_languageModel",
            index: 0,
          },
        ],
      ],
    },
    Consult_contexts: {
      main: [
        [
          {
            node: "Messages",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Add_context: {
      main: [
        [
          {
            node: "Wait",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Add_entity: {
      main: [
        [
          {
            node: "Edit Fields1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Consult_entity: {
      main: [
        [
          {
            node: "Edit Fields1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Delected_contexts: {
      main: [
        [
          {
            node: "Edit Fields4",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Basic LLM Chain2": {
      main: [
        [
          {
            node: "Code",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Messages: {
      main: [
        [
          {
            node: "Basic LLM Chain2",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Crypto: {
      main: [
        [
          {
            node: "Add_context",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code: {
      main: [
        [
          {
            node: "Delected_contexts",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code1: {
      main: [
        [
          {
            node: "Basic LLM Chain",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code2: {
      main: [
        [
          {
            node: "OpenAI",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields4": {
      main: [
        [
          {
            node: "Fields_prompt_before",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Wait: {
      main: [
        [
          {
            node: "Consult_contexts",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields5": {
      main: [
        [
          {
            node: "MongoDB",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    MongoDB: {
      main: [
        [
          {
            node: "Type_msg1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Type_msg1: {
      main: [
        [
          {
            node: "Code5",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Google Sheets": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Basic LLM Chain1": {
      main: [
        [
          {
            node: "Fields_Ai_Admin",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "OpenAI Chat Model1": {
      ai_languageModel: [
        [
          {
            node: "Basic LLM Chain1",
            type: "ai_languageModel",
            index: 0,
          },
        ],
      ],
    },
    OpenAI1: {
      main: [
        [
          {
            node: "Fields_Ai_Admin",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code3: {
      main: [
        [
          {
            node: "OpenAI1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code4: {
      main: [
        [
          {
            node: "Basic LLM Chain1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields6": {
      main: [
        [
          {
            node: "HTTP Request1",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Google Drive": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "yo-con-yo": {
      main: [
        [
          {
            node: "Code4",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Code3",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Edit Fields7",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Type_msg: {
      main: [
        [
          {
            node: "yo-con-yo",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Edit Fields5",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Code1",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Code2",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Edit Fields3",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Code5: {
      main: [
        [
          {
            node: "Consult_entity",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Google Calendar": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    DateTime: {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Edit Fields7": {
      main: [
        [
          {
            node: "Fields_Ai_Admin",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Products_Services: {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "OpenAI Admin": {
      ai_languageModel: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_languageModel",
            index: 0,
          },
        ],
      ],
    },
    "Postgres Amin": {
      ai_memory: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_memory",
            index: 0,
          },
        ],
      ],
    },
    "Date Time": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Find Prompts": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Insert Prompts": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "AI Agent Admin": {
      main: [
        [
          {
            node: "Edit Fields6",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "HTTP Scraping": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    Fields_Ai_Admin: {
      main: [
        [
          {
            node: "AI Agent Admin",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Code Tool": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Call n8n Workflow Tool": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    Consult_prompts: {
      main: [
        [
          {
            node: "Fields_prompt_after",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Fields_prompt_before: {
      main: [
        [
          {
            node: "Consult_prompts",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    Fields_prompt_after: {
      main: [
        [
          {
            node: "AI Agent",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Google Contacts": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Find Catalog": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Insert Catalog": {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    Crypto1: {
      ai_tool: [
        [
          {
            node: "AI Agent Admin",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Find Catalog1": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "HTTP Request2": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Google Calendar1": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Agente de Calendario1": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
    "Agente CRM Clinica1": {
      ai_tool: [
        [
          {
            node: "AI Agent",
            type: "ai_tool",
            index: 0,
          },
        ],
      ],
    },
  },
  pinData: {
    Webhook: [
      {
        headers: {
          connection: "keep-alive",
          host: "n8n.gestionapp.co",
          "x-forwarded-scheme": "https",
          "x-forwarded-proto": "https",
          "x-forwarded-for": "192.168.0.4",
          "x-real-ip": "192.168.0.4",
          "content-length": "984",
          accept: "application/json, text/plain, */*",
          "content-type":
            "multipart/form-data; boundary=--------------------------145177164822612779556580",
          "api-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiQUJDREYiLCJpYXQiOjE3MzkzMTQ4OTF9.A_Idgicly6wzofHAsRH94ATWQZLm8z4oxvVONfsfFus",
          "user-agent": "axios/1.7.7",
          "accept-encoding": "gzip, compress, deflate, br",
        },
        params: {},
        query: {},
        body: {
          name: "Gestión App",
          phone: "573012673944",
          fromMe: "false",
          host: "573216254920",
          bot: "taEXw",
          company: "ABCDF",
          type: "text",
          message: "puedes agendarme un cita mañana a la 1pm",
        },
        webhookUrl: "http://localhost:5678/webhook/gestionapp",
        executionMode: "production",
      },
    ],
  },
  meta: {
    instanceId:
      "ea637ea93884119a0f8092087dd8f999df4dfee694a06faa51c32e60238b93ce",
  },
};
