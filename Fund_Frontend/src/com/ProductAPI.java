package com;

import java.io.IOException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;



@WebServlet("/ProductAPI")
public class ProductAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	Product productObj = new Product(); 
	 
	 public ProductAPI() {
	        super();
	       
	    }
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			 String output = productObj.insertProduct(request.getParameter("pTitle"), 
			 request.getParameter("pDesc"), 
			request.getParameter("pPrice"), 
			request.getParameter("resName"),
			 request.getParameter("date"));
			
			 response.getWriter().write(output);
			}



	protected void doPut(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			 Map paras = getParasMap(request); 
			 
			 String output = productObj.updateProduct(paras.get("hidpIdSave").toString(), 
			 paras.get("pTitle").toString(), 
			 paras.get("pDesc").toString(), 
			paras.get("pPrice").toString(), 
			paras.get("resName").toString(), 
			 paras.get("date").toString());
			
			 response.getWriter().write(output); 
			} 
	
		

	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			 Map paras = getParasMap(request); 
			 String output = productObj.deleteProduct(paras.get("pId").toString()); 
			response.getWriter().write(output); 
			}

	

	private static Map getParasMap(HttpServletRequest request)
    {
     Map<String, String> map = new HashMap<String, String>();
    try {
     Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
     String queryString = scanner.hasNext() ?
     scanner.useDelimiter("\\A").next() : "";
     scanner.close();
     String[] params = queryString.split("&");
     for (String param : params)
     { 
    	 String[] p = param.split("=");
    	 map.put(p[0], p[1]);
     }
      }catch (Exception e)
    	 {
    	 }
    	return map;  
    }
}
