import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, NotFoundException, ValidationPipe} from "@nestjs/common";
import * as request from "supertest";
import {AppModule} from "./../src/app.module";
import {PaymentService} from "../src/payments/payments.service";
import {PaymentController} from "../src/payments/payments.controller";
import {Payment} from "../src/payments/payments.entity";
import {AuthsController} from "../src/auths/auths.controller";
import {AuthsService} from "../src/auths/auths.service";
import {Request, Response} from "express";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("HI EVERYONE!");
  });

  describe("/coin-history/:id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/coin-history/4").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/coin-history").send({id: "87395690-6c83-4b8a-a6b4-67b55db2439b", used_coin: 5}).expect(201);
    });
  });

  describe("/hobbies/:hobby_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/hobbies").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/hobbies/join").send({hobby: "서핑"}).expect(201);
    });
    it("PUT", () => {
      return request(app.getHttpServer()).put("/hobbies/16").send({hobby: "테스트하기"}).expect(200);
    });
    // it("DELETE", () => {
    //   return request(app.getHttpServer()).delete("/hobbies/30").expect(200);
    // });
  });

  describe("/moods/:mood_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/moods").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/moods/join").send({mood: "사랑받는중"}).expect(201);
    });
    it("PUT", () => {
      return request(app.getHttpServer()).put("/moods/5").send({mood: "화나요"}).expect(200);
    });
    // it("DELETE", () => {
    //   return request(app.getHttpServer()).delete("/moods/22").expect(200);
    // });
  });

  describe("/notices", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/notices").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/notices").send({notice: "공지사항입니당"}).expect(200);
    });
  });

  describe("/order/:order_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/order").expect(200);
    });
    it("GET", () => {
      return request(app.getHttpServer()).get("/order/6").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/order").send({amount: 4500, coin: 400}).expect(201);
    });
    // it("DELETE", () => {
    //   return request(app.getHttpServer()).delete("/order/13").expect(200);
    // });
  });

  describe("/visit-history/:id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/visit-history/10").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/visit-history/0a874bae-9ed5-4f8a-8c61-93753bb3c36a").expect(201);
    });
  });

  describe("/payments/:user_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/payments").expect(200);
    });
    it("GET", () => {
      return request(app.getHttpServer()).get("/payments/0a874bae-9ed5-4f8a-8c61-93753bb3c36a").expect(200);
    });
    // post는 외부 api 사용하는 거라서 mock 해야햄...
  });

  describe("/reports/:user_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/reports").expect(200);
    });
    it("GET", () => {
      return request(app.getHttpServer()).get("/reports/9937aa26-17bc-4001-ac8b-2de5fa7d88b9").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/reports").send({user_id: "9937aa26-17bc-4001-ac8b-2de5fa7d88b9", reason: "성적 발언"}).expect(201);
    });
  });

  describe("/themes/:theme_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/themes").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer()).post("/themes/join").send({theme: "같이 롤 할 사람 구해요!"}).expect(201);
    });
    it("PUT", () => {
      return request(app.getHttpServer()).put("/themes/6").send({theme: "연애 상담 해주세요.."}).expect(200);
    });
    // it("DELETE", () => {
    //   return request(app.getHttpServer()).delete("/themes/14").expect(200);
    // });
  });

  describe("user-hobby/:user_id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/user-hobby/3fe2f2d4-3aa1-4227-92c8-ac706c3fde52").expect(200);
    });
    it("POST", () => {
      return request(app.getHttpServer())
        .post("/user-hobby/join")
        .send({user_id: "3fe2f2d4-3aa1-4227-92c8-ac706c3fde52", hobby_id: [9, 10, 11]})
        .expect(201);
    });
  });

  describe("/users/:id", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/users").expect(200);
    });
    it("GET", () => {
      return request(app.getHttpServer()).get("/users/0a874bae-9ed5-4f8a-8c61-93753bb3c36a").expect(200);
    });
    it("PATCH", () => {
      return request(app.getHttpServer()).patch("/users/score").send({user_id: "0a874bae-9ed5-4f8a-8c61-93753bb3c36a", score: 3}).expect(200);
    });
    it("PATCH", () => {
      return request(app.getHttpServer()).patch("/users/0a874bae-9ed5-4f8a-8c61-93753bb3c36a").send({mood_id: 5}).expect(200);
    });
    // it("DELETE", () => {
    //   return request(app.getHttpServer()).delete("users/c8a8b3ad-30b7-46ac-9b94-b35c2098ac6b").expect(200);
    // });
  });
  describe("PaymentController", () => {
    let controller: PaymentController;
    let service: PaymentService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [PaymentController],
        providers: [
          {
            provide: PaymentService,
            useValue: {
              confirmPayment: jest.fn(),
              getAllHistory: jest.fn(),
              getOneUserHistory: jest.fn(),
            },
          },
        ],
      }).compile();

      controller = module.get<PaymentController>(PaymentController);
      service = module.get<PaymentService>(PaymentService);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("confirmPayment", () => {
      it("결제 승인", async () => {
        // 상태 설정~
        const paymentInfo = {
          paymentKey: "payment_key",
          orderId: "order_id",
          amount: 100,
          userId: "user_id",
          coin: 10,
        };
        const expectedResult = {} as Payment;
        (service.confirmPayment as jest.Mock).mockResolvedValue(expectedResult);

        // 컨트롤러 일 한다~
        await controller.confirmPayment(paymentInfo);

        // 이런 값을 기대한다~
        expect(service.confirmPayment).toHaveBeenCalledWith(paymentInfo);
      });
    });

    describe("getAllHistory", () => {
      it("결제 내역 가져오기", async () => {
        // 상태 설정~
        const expectedResult = [{}] as Payment[];
        (service.getAllHistory as jest.Mock).mockResolvedValue(expectedResult);

        // 컨트롤러 또 일 한다~
        await controller.getAllHistory();

        // 이런 값을 기대한다~
        expect(service.getAllHistory).toHaveBeenCalled();
      });
    });

    describe("getOneUserHistory", () => {
      it("특정 유저의 결제 내역 가져오기", async () => {
        // 상태 설정~
        const userId = "user_id";
        const expectedResult = [{}] as Payment[];
        (service.getOneUserHistory as jest.Mock).mockResolvedValue(expectedResult);

        // 컨트롤러 또 또 일 한다~
        await controller.getOneUserHistory(userId);

        // 이런 값을 기대한다~
        expect(service.getOneUserHistory).toHaveBeenCalledWith(userId);
      });

      it("사용자의 결제 내역을 찾을 수 없습니당", async () => {
        // 상태 설정~
        const userId = "user_id";
        (service.getOneUserHistory as jest.Mock).mockRejectedValue(new NotFoundException());

        // 컨트롤러 또 또 또 일 하고~ 난 이런 값을 원한다~
        await expect(controller.getOneUserHistory(userId)).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe("AuthsController", () => {
    let controller: AuthsController;
    let service: AuthsService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthsController],
        providers: [
          {
            provide: AuthsService,
            useValue: {
              OAuthLogin: jest.fn(),
              logout: jest.fn(),
            },
          },
        ],
      }).compile();

      controller = module.get<AuthsController>(AuthsController);
      service = module.get<AuthsService>(AuthsService);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("OAuthLogin", () => {
      it("소셜 로그인", async () => {
        // 상태 설정~
        const req: Partial<Request> = {};
        const res: Partial<Response> = {};

        // 컨트롤러 일 한다~
        await controller.loginNaverCallback(req as Request, res as Response);

        // 값 줘!
        expect(service.OAuthLogin).toHaveBeenCalled();
      });
    });

    describe("logout", () => {
      it("로그아웃", async () => {
        // 상태 설정~
        const res: Partial<Response> = {};

        // 컨트롤러 일 한다~
        await controller.logoutNaver(res as Response);

        // 값 줘!
        expect(service.logout).toHaveBeenCalled();
      });
    });
  });
});
