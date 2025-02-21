import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { coreServices } from '@/libs/api/constants';
import { authOptions } from '@/libs/next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.access_token) {
      return NextResponse.json({
        message: 'Unauthorized'
      }, { status: 401 });
    };
    
    const token = `Bearer ${session.user.access_token}`;

    const response = await fetch(`${coreServices}/contact_upload_template/`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      return NextResponse.json({
        message: 'Failed to download export data'
      }, { status: response.status });
    }

    const data = await response.blob();

    const headers = new Headers();
    const FILENAME = "static_test_export_data.xlsx";

    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename=${FILENAME}`); 

    const buffer = await data.arrayBuffer();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(buffer));
        controller.close();
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Internal Server Error';
    
    return NextResponse.json({ message }, { status: 500 });
  }
}
